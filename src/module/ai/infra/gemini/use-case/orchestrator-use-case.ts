import { Injectable } from '@nestjs/common';

import { GeminiChatRequestDto } from '@module/ai/infra/gemini/dto/request/gemini-chat.request.dto';
import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import {
  AiResponseInterface,
  AiToolCallType,
} from '@module/ai/infra/gemini/types/tool-call.interface';
import { McpUseCase } from '@module/ai/infra/mcp/use-case/mcp.use-case';

@Injectable()
export class GeminiOrchestratorUseCase {
  protected readonly _type = GeminiOrchestratorUseCase.name;

  public constructor(
    private readonly client: GeminiClient,
    private readonly mcp: McpUseCase,
  ) {}

  public async execute(
    dto: GeminiChatRequestDto,
  ): Promise<AiResponseInterface> {
    const rawText = await this.client.chat([
      { role: 'assistant', content: this.buildSystemPrompt() },
      { role: 'user', content: dto.message },
    ]);

    const toolCall = this.tryParseToolCall(rawText);

    if (toolCall) {
      return this.executeTool(toolCall);
    }

    return {
      content: [{ type: 'text', text: rawText }],
    };
  }

  private buildSystemPrompt(): string {
    return `
Você é um assistente com acesso às seguintes ferramentas:

1. consultar_pje
   - Descrição: Consulta um processo no sistema PJe
   - Parâmetros:
     - numeroProcesso (string, obrigatório)

2. consultar_usuarios
   - Descrição: Lista usuários do banco interno
   - Parâmetros: nenhum

REGRAS:
- Para usar ferramenta, responda APENAS em JSON puro
- Formato:
{
  "tool": "nome_da_ferramenta",
  "arguments": { ... }
}
`;
  }

  private isToolCall(value: unknown): value is AiToolCallType {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    if (!('tool' in value) || !('arguments' in value)) {
      return false;
    }

    if (typeof (value as { tool: unknown }).tool !== 'string') {
      return false;
    }

    if (typeof (value as { arguments: unknown }).arguments !== 'object') {
      return false;
    }

    return true;
  }

  private tryParseToolCall(text: string): AiToolCallType | null {
    try {
      const normalized = this.normalizeToolCallText(text);
      const parsed: unknown = JSON.parse(normalized);

      if (this.isToolCall(parsed)) {
        return parsed;
      }

      return null;
    } catch {
      return null;
    }
  }

  private async executeTool(
    toolCall: AiToolCallType,
  ): Promise<AiResponseInterface> {
    switch (toolCall.tool) {
      case 'consultar_pje': {
        const result = await this.mcp.consultarPje(
          toolCall.arguments.numeroProcesso,
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'consultar_usuarios': {
        const result = await this.mcp.consultarUsuarios();

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    }
  }

  private normalizeToolCallText(text: string): string {
    return text
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');
  }
}
