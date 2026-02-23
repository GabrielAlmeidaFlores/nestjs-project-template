import { GenerateContentParameters, GoogleGenAI, Part } from '@google/genai';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';
import jsPDF from 'jspdf';

import { GenerativeIaApiKeyInvalidError } from '@infra/generative-ia/error/generative-ia-api-key-invalid.error';
import { GenerativeIaConnectionError } from '@infra/generative-ia/error/generative-ia-connection.error';
import { GenerativeIaFunctionHandlerNotFoundError } from '@infra/generative-ia/error/generative-ia-function-handler-not-found.error';
import { GenerativeIaQuotaExceededError } from '@infra/generative-ia/error/generative-ia-quota-exceeded.error';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
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
    const maxOutputTokens = 5_000;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-3-flash-preview',
      maxOutputTokens,
    );
  }

  public async generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const maxOutputTokens = 8_192;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-3-flash-preview',
      maxOutputTokens,
    );
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const maxOutputTokens = 10_000;

    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-3-pro-preview',
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
        temperature: 0.1,
        maxOutputTokens,
        topP: 0.95,
        topK: 40,
      },
    } as GenerateContentParameters;

    if (props.responseConfig !== undefined) {
      if (
        props.responseConfig.jsonSchema !== undefined &&
        contentConfig.config !== undefined
      ) {
        contentConfig.config.responseJsonSchema =
          props.responseConfig.jsonSchema;
      }

      if (
        props.responseConfig.responseMimeType !== undefined &&
        contentConfig.config !== undefined
      ) {
        contentConfig.config.responseMimeType =
          props.responseConfig.responseMimeType;
      }
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

    try {
      const result =
        await this.googleGenerativeAI.models.generateContent(contentConfig);

      return result.text ?? null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('fetch failed')) {
          throw new GenerativeIaConnectionError({
            originalError: error.message,
          });
        }

        if (
          error.message.includes('API key') ||
          error.message.includes('api key')
        ) {
          throw new GenerativeIaApiKeyInvalidError();
        }

        if (
          error.message.includes('quota') ||
          error.message.includes('limit')
        ) {
          throw new GenerativeIaQuotaExceededError();
        }
      }

      throw error;
    }
  }

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
      try {
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
              throw new GenerativeIaFunctionHandlerNotFoundError({
                functionName,
              });
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
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message.includes('fetch failed')) {
            throw new GenerativeIaConnectionError({
              originalError: error.message,
            });
          }

          if (
            error.message.includes('API key') ||
            error.message.includes('api key')
          ) {
            throw new GenerativeIaApiKeyInvalidError();
          }

          if (
            error.message.includes('quota') ||
            error.message.includes('limit')
          ) {
            throw new GenerativeIaQuotaExceededError();
          }
        }

        throw error;
      }
    }

    return 'Houve um erro ao processar sua mensagem. Por favor, tente novamente.';
  }

  private async buildPartWithFileContent(
    contentList: GenerativeIaPartType[],
  ): Promise<Part[]> {
    const results = await Promise.all(
      contentList.map(async (content) => {
        if (typeof content === 'string') {
          return { text: content } as Part;
        }

        let fileData = await fileType.fileTypeFromBuffer(content);

        if (fileData === undefined) {
          const textContext = content.toString('utf-8');
          const pdfBuffer = this.generatePdfFromText(textContext);
          fileData = await fileType.fileTypeFromBuffer(pdfBuffer);
          content = pdfBuffer;
        }

        if (fileData === undefined) {
          return null;
        }

        return {
          inlineData: {
            mimeType: fileData.mime,
            data: content.toString('base64'),
          },
        } as Part;
      }),
    );

    return results.filter((part): part is Part => part !== null);
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
