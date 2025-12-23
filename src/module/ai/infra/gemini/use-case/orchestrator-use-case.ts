import { Injectable } from '@nestjs/common';

import { GeminiChatRequestDto } from '@module/ai/infra/gemini/dto/request/gemini-chat.request.dto';
import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import {
  AiResponseInterface,
  AiToolCallType,
} from '@module/ai/infra/gemini/types/tool-call.interface';
import { McpUseCase } from '@module/ai/infra/mcp/use-case/mcp.use-case';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';

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

1. legal_pleading_list
   - Descrição: Lista peças processuais (Legal Pleading) do usuário/organização autenticados.
   - Use esta ferramenta SEMPRE que o usuário pedir:
     - a peça mais recente
     - a última peça
     - listar peças
     - buscar peças por nome, parte, termo ou contexto
   - Parâmetros aceitos:
     page, limit, search, sortField, field, status, searchBy

2. legal_pleading_get
   - Descrição: Retorna os detalhes completos de uma peça processual.
   - Use esta ferramenta SOMENTE quando você já tiver um legalPleadingId válido,
     normalmente obtido a partir do resultado do legal_pleading_list.

REGRAS IMPORTANTES:
- Se o usuário pedir detalhes de uma peça SEM informar ID:
  1) PRIMEIRO chame legal_pleading_list
     - Use search quando houver nome ou termo
     - Use limit = 1
     - Use ordenação para obter a peça mais recente
  2) DEPOIS chame legal_pleading_get com o ID retornado
- NUNCA invente IDs.
- NUNCA responda com dados detalhados sem antes chamar legal_pleading_get.
- Para usar ferramentas, responda APENAS em JSON puro, sem texto adicional.

Formato obrigatório para uso de ferramenta:
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

      case 'legal_pleading_list': {
        const page = Number(toolCall.arguments.page);
        const limit = Number(toolCall.arguments.limit);

        const result = await this.mcp.legalPleadingList(
          ListLegalPleadingRequestDto.build({
            page,
            limit,
            field: toolCall.arguments.field,
            search: toolCall.arguments.search,
            searchBy: toolCall.arguments.searchBy,
            sortField: toolCall.arguments.sortField,
            status: toolCall.arguments.status as AnalysisStatusEnum,
          }),
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'legal_pleading_get': {
        const result = await this.mcp.legalPleadingGet(
          toolCall.arguments.legalPleadingId,
        );

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
