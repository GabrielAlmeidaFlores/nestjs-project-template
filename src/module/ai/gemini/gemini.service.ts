import { GoogleGenAI } from '@google/genai';

import type { GenerateContentParameters, Part } from '@google/genai';

export class GeminiClient {
  protected readonly _type = GeminiClient.name;
  private readonly ai: GoogleGenAI;

  public constructor() {
    const apiKey = process.env['GEMINI_API_KEY'];

    if (apiKey === undefined || apiKey.trim() === '') {
      throw new Error('GEMINI_API_KEY não definida no ambiente');
    }

    this.ai = new GoogleGenAI({ apiKey });
  }

  public async chat(
    messages: { role: 'user' | 'assistant'; content: string }[],
    files?: Array<{ mimeType: string; data: Buffer }>,
  ): Promise<string> {
    const parts: Part[] = messages.map((m) => ({
      text: `${m.role}: ${m.content}`,
    }));

    if (Array.isArray(files) && files.length > 0) {
      for (const f of files) {
        parts.push({
          inlineData: {
            mimeType: f.mimeType || 'application/octet-stream',
            data: f.data.toString('base64'),
          },
        });
      }
    }

    const contentConfig = {
      model: 'gemini-2.5-flash',
      contents: parts,
    } as GenerateContentParameters;

    const response = await this.ai.models.generateContent(contentConfig);

    return response.text ?? '';
  }
}
