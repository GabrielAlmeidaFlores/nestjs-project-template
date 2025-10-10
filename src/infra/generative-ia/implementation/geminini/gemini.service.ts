import fs from 'fs';
import path from 'path';

import { GoogleGenAI, Part } from '@google/genai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerativeIaApplicationVariable } from '@shared/system/constant/application-variable/source/generative-ia.application-variable';

@Injectable()
export class GeminiService implements GenerativeIaGateway {
  protected readonly _type = GeminiService.name;

  private readonly googleGenerativeAI: GoogleGenAI;

  private chat: ReturnType<
    ReturnType<GoogleGenerativeAI['getGenerativeModel']>['startChat']
  > | null = null;

  public constructor() {
    this.googleGenerativeAI = new GoogleGenAI({
      apiKey: GenerativeIaApplicationVariable.GENERATIVE_IA_GEMINI_API_KEY,
    });
  }

  public async generateHighQualityResponseFromPromptAndFiles(
    prompt: string,
    files: Buffer[],
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
      model: 'gemini-2.5-pro',
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

  public async ask(
    filePath: string,
    input: string | Buffer | Array<Buffer>,
  ): Promise<string> {
    this.createAgentFromFile(filePath);
    if (!this.chat) {
      throw new Error('Agente não foi inicializado.');
    }
    const { Part: GenAiPart } = require('@google/generative-ai');
    const parts: InstanceType<typeof GenAiPart>[] = [];

    if (typeof input === 'string') {
      parts.push({ text: input });
    } else if (Buffer.isBuffer(input)) {
      const fileData = await fileType.fileTypeFromBuffer(input);
      if (fileData) {
        parts.push({
          inlineData: {
            mimeType: fileData.mime,
            data: input.toString('base64'),
          },
        });
      }
    } else if (Array.isArray(input)) {
      for (const buf of input) {
        const fileData = await fileType.fileTypeFromBuffer(buf);
        if (fileData) {
          parts.push({
            inlineData: {
              mimeType: fileData.mime,
              data: buf.toString('base64'),
            },
          });
        }
      }
    }

    if (parts.length === 0) {
      throw new Error('Nenhum conteúdo válido para enviar.');
    }

    const result = await this.chat.sendMessage(parts);
    return result.response.text();
  }

  private createAgentFromFile(filePath: string): void {
    const genAI = new GoogleGenerativeAI(
      GenerativeIaApplicationVariable.GENERATIVE_IA_GEMINI_API_KEY,
    );
    const instructions = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    this.chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: instructions }] },
        {
          role: 'model',
          parts: [
            {
              text: 'Entendido. Estou pronto para responder com base nessas instruções.',
            },
          ],
        },
      ],
    });
  }

  public async analysisFastCnis(
    input: string | Buffer | Array<Buffer>,
  ): Promise<string> {
    return this.ask(
      'assets/generative-ia/fast-analysis-cnis/PROMPT - COMPLETO - ANALISE RAPIDA DE CNIS - COM REGRAS DE APOSENTADORIA.docx',
      input,
    );
  }
}
