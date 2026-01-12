import { GenerateContentParameters, GoogleGenAI, Part } from '@google/genai';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';
import jsPDF from 'jspdf';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { GenerativeIaPartType } from '@infra/generative-ia/type/generative-ia-part.type';
import { GenerativeIaApplicationVariable } from '@shared/system/constant/application-variable/source/generative-ia.application-variable';

@Injectable()
export class GeminiService implements GenerativeIaGateway {
  protected readonly _type = GeminiService.name;

  private readonly googleGenerativeAI: GoogleGenAI;

  public constructor() {
    this.googleGenerativeAI = new GoogleGenAI({
      apiKey: GenerativeIaApplicationVariable.GENERATIVE_IA_GEMINI_API_KEY,
    });
  }

  public async generateFlashLiteResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const maxOutputTokens = 10_000;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-flash',
      maxOutputTokens,
    );
  }

  public async generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const maxOutputTokens = 50_000;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-flash',
      maxOutputTokens,
    );
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const maxOutputTokens = 1_000_000;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-pro',
      maxOutputTokens,
    );
  }

  private async generateResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
    model: string,
    maxOutputTokens: number,
  ): Promise<string | null> {
    const promptPart: Part[] = [];
    const systemInstructionParts: Part[] = [];

    if (props.prompt !== undefined) {
      promptPart.push({ text: props.prompt });
    }

    if (props.systemInstruction !== undefined) {
      systemInstructionParts.push({ text: props.systemInstruction });
    }

    if (props.promptFiles !== undefined) {
      const fileParts = await this.buildPartWithFileContent(props.promptFiles);
      promptPart.push(...fileParts);
    }

    const contents: Array<{ role: string; parts: Part[] }> = [];

    if (
      props.conversationHistory !== undefined &&
      props.conversationHistory.length > 0
    ) {
      for (const msg of props.conversationHistory) {
        contents.push({
          role: msg.role,
          parts: [{ text: msg.content }],
        });
      }
    }

    if (promptPart.length > 0) {
      contents.push({
        role: 'user',
        parts: promptPart,
      });
    }

    const contentConfig = {
      model,
      contents: contents.length > 0 ? contents : { role: 'user', parts: [] },
      config: {
        temperature: 0.3,
        maxOutputTokens,
      },
    } as GenerateContentParameters;

    if (props.responseJsonSchema !== undefined && contentConfig.config) {
      contentConfig.config.responseJsonSchema = props.responseJsonSchema;
    }

    if (props.useResponseMimeTypeForTools === true && contentConfig.config) {
      contentConfig.config.responseMimeType = 'application/json';
    }

    const unifiedInstruction = `${props.systemInstruction ?? ''} ${props.prompt ?? ''}`;

    const URL_REGEX = /\bhttps?:\/\/[^\s"'<>]+/gi;
    const hasUrl = URL_REGEX.test(unifiedInstruction);

    if (contentConfig.config) {
      const toolsList: Array<unknown> = [];

      if (hasUrl) {
        toolsList.push({
          urlContext: {},
        });
      }

      if (props.tools !== undefined && props.tools.length > 0) {
        const functionDeclarations = props.tools.map((tool) => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
        }));

        toolsList.push({
          functionDeclarations,
        });
      }

      if (toolsList.length > 0) {
        contentConfig.config.tools = toolsList as never;
      }
    }

    if (systemInstructionParts.length > 0 && contentConfig.config) {
      contentConfig.config.systemInstruction = {
        parts: systemInstructionParts,
      };
    }

    if (
      props.tools !== undefined &&
      props.toolHandlers !== undefined &&
      props.tools.length > 0
    ) {
      return await this.generateWithFunctionCalling(
        contentConfig,
        props.toolHandlers,
      );
    }

    const result =
      await this.googleGenerativeAI.models.generateContent(contentConfig);

    return result.text ?? null;
  }

  /**
   * Handles automatic function calling loop with Gemini
   */
  private async generateWithFunctionCalling(
    contentConfig: GenerateContentParameters,
    toolHandlers: Record<
      string,
      (params: Record<string, unknown>) => Promise<unknown>
    >,
  ): Promise<string | null> {
    const MAX_FUNCTION_CALLS = 10;
    let callCount = 0;
    const conversationHistory: Array<unknown> = Array.isArray(
      contentConfig.contents,
    )
      ? [...contentConfig.contents]
      : [contentConfig.contents];

    while (callCount < MAX_FUNCTION_CALLS) {
      const result = await this.googleGenerativeAI.models.generateContent({
        ...contentConfig,
        contents: conversationHistory as never,
      });

      const functionCalls = result.functionCalls;

      if (functionCalls === undefined || functionCalls.length === 0) {
        return result.text ?? null;
      }

      const candidates = result.candidates;
      if (candidates?.[0]?.content !== undefined) {
        conversationHistory.push(candidates[0].content);
      }

      const functionResponses: Array<unknown> = [];

      for (const functionCall of functionCalls) {
        const functionName = functionCall.name ?? '';
        const functionParams = functionCall.args ?? {};

        try {
          const handler = toolHandlers[functionName] as
            | ((params: Record<string, unknown>) => Promise<unknown>)
            | undefined;

          if (handler === undefined) {
            throw new Error(`Handler not found for function: ${functionName}`);
          }

          const functionResult = await handler(functionParams);

          functionResponses.push({
            functionResponse: {
              name: functionName,
              response: functionResult,
            },
          });
        } catch (error: unknown) {
          let errorMessage = 'Unknown error';
          const MAX_ERROR_MESSAGE_LENGTH = 200;

          if (error instanceof Error) {
            errorMessage = error.message
              .replace(/["']/g, '')
              .replace(/\\/g, '/')
              .substring(0, MAX_ERROR_MESSAGE_LENGTH);
          }

          functionResponses.push({
            functionResponse: {
              name: functionName,
              response: {
                success: false,
                error: errorMessage,
                message:
                  'Erro ao executar a ferramenta. Por favor, tente novamente ou reformule sua pergunta.',
              },
            },
          });
        }
      }

      conversationHistory.push({
        role: 'user',
        parts: functionResponses,
      });

      callCount++;
    }

    return 'Maximum function call limit reached. Please try again with a simpler query.';
  }

  private async buildPartWithFileContent(
    contentList: GenerativeIaPartType[],
  ): Promise<Part[]> {
    const partList: Part[] = [];

    for (let content of contentList) {
      if (typeof content === 'string') {
        partList.push({ text: content });
        continue;
      }

      let fileData = await fileType.fileTypeFromBuffer(content);

      if (fileData === undefined) {
        const textContext = content.toString('utf-8');
        content = this.generatePdfFromText(textContext);
        fileData = await fileType.fileTypeFromBuffer(content);
      }

      if (fileData === undefined) {
        continue;
      }

      partList.push({
        inlineData: {
          mimeType: fileData.mime,
          data: content.toString('base64'),
        },
      });
    }

    return partList;
  }

  private generatePdfFromText(text: string): Buffer {
    const doc = new jsPDF();
    const margin = 10;
    const lineHeight = 7;
    let y = margin;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    const textLines = doc.splitTextToSize(text, maxWidth) as string[];

    for (const line of textLines) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }

    const pdfArrayBuffer = doc.output('arraybuffer');
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    return pdfBuffer;
  }
}
