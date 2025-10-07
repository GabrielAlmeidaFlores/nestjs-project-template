import { GoogleGenAI, Part } from '@google/genai';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
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
    prompt: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generateResponseFromPromptAndFiles(
      prompt,
      files,
      'gemini-1.5-pro',
    );
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    prompt: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generateResponseFromPromptAndFiles(
      prompt,
      files,
      'gemini-2.5-pro',
    );
  }

  private async generateResponseFromPromptAndFiles(
    prompt: string,
    files: Buffer[],
    model: string,
  ): Promise<string | null> {
    const promptPart: Part[] = [
      {
        text: prompt,
      },
    ];

    for (const file of files) {
      const fileData = await fileType.fileTypeFromBuffer(file);

      if (fileData === undefined) {
        continue;
      }

      promptPart.push({
        inlineData: {
          mimeType: fileData.mime,
          data: file.toString('base64'),
        },
      });
    }

    const result = await this.googleGenerativeAI.models.generateContentStream({
      model,
      contents: {
        role: 'user',
        parts: promptPart,
      },
      config: {
        temperature: 0.3,
      },
    });

    let fullResponse = '';

    for await (const chunk of result) {
      fullResponse += chunk.text;
    }

    return fullResponse.length > 0 ? fullResponse : null;
  }
}
