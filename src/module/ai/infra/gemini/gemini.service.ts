import { GoogleGenAI } from '@google/genai';

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
  ): Promise<string> {
    const contents = messages.map((m) => `${m.role}: ${m.content}`).join('\n');

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
    });

    return response.text ?? '';
  }
}
