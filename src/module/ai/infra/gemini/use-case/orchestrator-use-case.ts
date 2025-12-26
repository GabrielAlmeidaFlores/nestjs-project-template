import { Injectable } from '@nestjs/common';

import { GeminiChatRequestDto } from '@module/ai/infra/gemini/dto/request/gemini-chat.request.dto';
import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import {
  AiResponseInterface,
  AiToolCallType,
} from '@module/ai/infra/gemini/types/tool-call.interface';
import { McpUseCase } from '@module/ai/infra/mcp/use-case/mcp.use-case';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
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

3. analysis_tool_record_list
   - Descrição: Lista os registros de análises do usuário/organização autenticados (histórico de análises realizadas no sistema).
   - Use esta ferramenta quando o usuário pedir:
     - listar registros de análises / histórico de análises
     - buscar análise por termo, filtro ou tipo
     - ver as análises mais recentes
     - localizar análises de um cliente específico (quando houver um analysisToolClientId)
   - Parâmetros aceitos:
     - page (number): página (padrão 1)
     - limit (number): itens por página (padrão 10)
     - search (string, opcional): termo livre de busca
     - searchBy (string, opcional): campo/critério de busca suportado pela API
     - sortField (string, opcional): ordenação (ex.: "-createdAt" para mais recentes primeiro)
     - field (string, opcional): seleção de campos/visão (se suportado)
     - type (AnalysisToolRecordTypeEnum, opcional): filtra pelo tipo de registro de análise
     - analysisToolClientId (AnalysisToolClientId, opcional): filtra pelos registros vinculados a um cliente específico
   - Observações:
     - Para “mais recente”, use sortField = "-createdAt" e limit = 1.
     - Se o usuário pedir detalhes de um registro específico, primeiro liste para obter o identificador adequado e então chame a ferramenta de detalhes (se existir).

     Exemplo (mais recente):
{
  "tool": "analysis_tool_record_list",
  "arguments": { "page": 1, "limit": 1, "sortField": "-createdAt" }
}

4. cnis_fast_analysis_get
   - Descrição: Retorna os detalhes completos de uma Análise Rápida do CNIS (resultado já processado no sistema),
     identificada por um cnisFastAnalysisId.
   - Use esta ferramenta quando o usuário pedir:
     - ver detalhes de uma análise rápida do CNIS
     - abrir / consultar / recuperar uma análise rápida do CNIS específica
     - “me mostre o resultado da análise rápida do CNIS X” (onde X é um ID válido)
   - Parâmetros aceitos:
     - cnisFastAnalysisId (string): identificador da análise rápida do CNIS
   - Regras:
     - NUNCA invente cnisFastAnalysisId.
     - Se o usuário não informar o cnisFastAnalysisId, peça o ID ou, se existir uma ferramenta de listagem
       (ex.: cnis_fast_analysis_list), use-a primeiro para localizar o ID antes de chamar este get.

Exemplo:
{
  "tool": "cnis_fast_analysis_get",
  "arguments": { "cnisFastAnalysisId": "..." }
}

5. analysis_tool_client_list
   - Descrição: Lista os clientes do módulo Analysis Tool (AnalysisToolClient) vinculados ao usuário/organização autenticados.
     Um "Analysis Tool Client" representa a entidade de cliente/pessoa/parte analisada no sistema, e é usada para
     filtrar históricos e resultados de análises (por exemplo, usando analysisToolClientId em outras ferramentas).
   - Use esta ferramenta quando o usuário pedir:
     - listar clientes do analysis tool
     - buscar um cliente por nome, CPF/CNPJ, e-mail, telefone, número de processo, ou termo livre
     - “qual é o cliente X?”
     - localizar o analysisToolClientId para então consultar análises/histórico de um cliente
     - ver os clientes mais recentes cadastrados/criados (se a API suportar ordenação por createdAt)
   - Parâmetros aceitos:
     - page (number): página (padrão 1)
     - limit (number): itens por página (padrão 10)
     - search (string, opcional): termo livre de busca (ex.: nome, documento, parte, etc.)
     - searchBy (string, opcional): critério/campo de busca suportado pela API (ex.: "name", "document", etc.)
     - sortField (string, opcional): ordenação (ex.: "-createdAt" para mais recentes primeiro, se suportado)
     - field (string, opcional): seleção de campos/visão (se suportado)
     - status (string, opcional): filtro de status do cliente (se suportado)
   - Observações:
     - Se o usuário pedir “cliente mais recente”, use sortField = "-createdAt" e limit = 1 (se suportado).
     - Se o usuário pedir detalhes de um cliente e existir uma ferramenta de detalhes (ex.: analysis_tool_client_get),
       primeiro liste para obter o analysisToolClientId e então chame o get.

Exemplo (buscar por nome):
{
  "tool": "analysis_tool_client_list",
  "arguments": { "page": 1, "limit": 10, "search": "Maria Silva" }
}

Exemplo (mais recente):
{
  "tool": "analysis_tool_client_list",
  "arguments": { "page": 1, "limit": 1, "sortField": "-createdAt" }
}


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

  private async executeTool(
    toolCall: AiToolCallType,
  ): Promise<AiResponseInterface> {
    switch (toolCall.tool) {
      case 'legal_pleading_list': {
        const page = Number(toolCall.arguments.page);
        const limit = Number(toolCall.arguments.limit);

        const result = await this.mcp.legalPleadingList(
          ListLegalPleadingRequestDto.build({
            ...toolCall.arguments,
            page,
            limit,
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

      case 'analysis_tool_record_list': {
        const page = Number(toolCall.arguments.page);
        const limit = Number(toolCall.arguments.limit);

        const type = toolCall.arguments.type;
        const analysisToolClientId = toolCall.arguments.analysisToolClientId;

        const result = await this.mcp.analysisToolRecordList(
          ListAnalysisToolRecordRequestDto.build({
            ...toolCall.arguments,
            page,
            limit,
            type,
            analysisToolClientId,
          }),
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'cnis_fast_analysis_get': {
        const result = await this.mcp.cnisFastAnalysisGet(
          toolCall.arguments.cnisFastAnalysisId,
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'analysis_tool_client_list': {
        const page = Number(toolCall.arguments.page);
        const limit = Number(toolCall.arguments.limit);

        const result = await this.mcp.analysisToolClientList(
          ListAnalysisToolRecordRequestDto.build({
            ...toolCall.arguments,
            page,
            limit,
          }),
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    }
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

  private normalizeToolCallText(text: string): string {
    return text
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '');
  }
}
