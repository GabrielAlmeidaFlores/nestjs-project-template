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
  public async generateFlashResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    const maxOutputTokens = 10_000;

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

    const contentConfig = {
      model,
      contents: {
        role: 'user',
      },
      config: {
        temperature: 0.3,
        maxOutputTokens,
      },
    } as GenerateContentParameters;

    if (props.responseJsonSchema !== undefined && contentConfig.config) {
      contentConfig.config.responseJsonSchema = props.responseJsonSchema;
      contentConfig.config.responseMimeType = 'application/json';
    }

    const unifiedInstruction = `${props.systemInstruction ?? ''} ${props.prompt ?? ''}`;

    const URL_REGEX = /\bhttps?:\/\/[^\s"'<>]+/gi;
    const hasUrl = URL_REGEX.test(unifiedInstruction);

    if (hasUrl && contentConfig.config) {
      contentConfig.config.tools = [
        {
          urlContext: {},
        },
      ];
    }

    if (promptPart.length > 0) {
      contentConfig.contents = promptPart;
    }

    if (systemInstructionParts.length > 0 && contentConfig.config) {
      contentConfig.config.systemInstruction = {
        parts: systemInstructionParts,
      };
    }

    const result =
      await this.googleGenerativeAI.models.generateContent(contentConfig);

    return result.text ?? null;
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
