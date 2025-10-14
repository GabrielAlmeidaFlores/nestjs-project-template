import { GoogleGenAI, Part } from '@google/genai';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
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
    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-flash',
    );
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
  ): Promise<string | null> {
    return await this.generateResponseFromPromptAndFiles(
      props,
      'gemini-2.5-pro',
    );
  }

  private async generateResponseFromPromptAndFiles(
    props: GenerateResponseInputModel,
    model: string,
  ): Promise<string | null> {
    const promptPart: Part[] = [];

    if (props.prompt !== undefined) {
      promptPart.push({ text: props.prompt });
    }

    if (props.files !== undefined) {
      for (const file of props.files) {
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
