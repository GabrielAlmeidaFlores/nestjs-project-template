import { Injectable } from '@nestjs/common';

import { GeminiChatRequestDto } from '@module/ai/infra/gemini/dto/request/gemini-chat.request.dto';
import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import {
  AiResponseInterface,
  AiToolCallType,
} from '@module/ai/infra/gemini/types/tool-call.interface';
import {
  JsonObjectInterface,
  McpUseCase,
} from '@module/ai/infra/mcp/use-case/mcp.use-case';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

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
    const MAX_TOOL_STEPS = 3;

    const messages: Array<{ role: 'assistant' | 'user'; content: string }> = [
      { role: 'assistant', content: this.buildSystemPrompt() },
      { role: 'user', content: dto.message },
    ];

    for (let step = 0; step < MAX_TOOL_STEPS; step++) {
      const rawText = await this.client.chat(messages);

      const toolCall = this.tryParseToolCall(rawText);

      if (!toolCall) {
        return { content: [{ type: 'text', text: rawText }] };
      }

      const toolResult = await this.executeTool(toolCall);

      messages.push({ role: 'assistant', content: rawText });

      messages.push({
        role: 'user',
        content: JSON.stringify(toolResult, null, 2),
      });

      if (toolResult.isError === true) {
        return toolResult;
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: `Limite de ${MAX_TOOL_STEPS} execuções de ferramentas atingido. Não foi possível concluir a operação.`,
        },
      ],
      isError: true,
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

Exemplo:
{
  "tool": "analysis_tool_record_list",
  "arguments": { "page": 1, "limit": 1, "sortField": "-createdAt" }
}

4. cnis_fast_analysis_get
   - Descrição: Retorna os detalhes completos de uma Análise Rápida do CNIS.
   - Parâmetros aceitos:
     - cnisFastAnalysisId (string)

Exemplo:
{
  "tool": "cnis_fast_analysis_get",
  "arguments": { "cnisFastAnalysisId": "..." }
}

5. analysis_tool_client_list
   - Descrição: Lista os clientes do módulo Analysis Tool.
   - Parâmetros aceitos:
     - page, limit, search, searchBy, sortField, field, status

Exemplo:
{
  "tool": "analysis_tool_client_list",
  "arguments": { "page": 1, "limit": 10, "search": "Maria Silva" }
}

6. analysis_tool_client_get
   - Descrição: Retorna os detalhes completos de um cliente.
   - Parâmetros aceitos:
     - analysisToolClientId (string) OBRIGATÓRIO

Exemplo correto:
{
  "tool": "analysis_tool_client_get",
  "arguments": { "analysisToolClientId": "dd273f05-6d11-4782-bb13-dad304e4b8a1" }
}

7. cnis_fast_analysis_patch
   - Descrição: Atualiza uma Análise Rápida do CNIS via PATCH.
   - Parâmetros aceitos:
     - cnisFastAnalysisId (string, obrigatório)
     - json (object, obrigatório): campos a atualizar
     - cnisDocumentPath (string, opcional): caminho local do arquivo CNIS (se necessário)
   - Regra para adicionar/remover legalProceedingNumber:
     1) SEMPRE chame cnis_fast_analysis_get para obter os valores atuais
     2) Em seguida chame cnis_fast_analysis_patch com o array atualizado (sem duplicar)

Exemplo:
{
  "tool": "cnis_fast_analysis_patch",
  "arguments": {
    "cnisFastAnalysisId": "...",
    "json": {
      "analysisToolClientId": "...",
      "legalProceedingNumber": ["...","..."],
      "inssBenefitNumber": ["..."]
    }
  }
}

8. legal_pleading_patch_complete_analysis
   - Descrição: Atualiza o CONTEÚDO FINAL da análise da peça processual, no campo:
     legalPleadingResult.legalPleadingCompleteAnalysis

   - Objetivo: permitir editar/aprimorar o HTML/texto final SEM perder o restante do conteúdo.

   - Parâmetros aceitos (OBRIGATÓRIOS):
     - legalPleadingId (string)
     - legalPleadingCompleteAnalysis (string)  <-- SEMPRE enviar o HTML/TEXTO COMPLETO final

   - Processo obrigatório (edição correta e segura):
     1) SEMPRE chame legal_pleading_get com o legalPleadingId para obter o JSON completo da peça.
     2) Extraia o valor atual em:
        legalPleadingResult.legalPleadingCompleteAnalysis
     3) Aplique SOMENTE a alteração pedida pelo usuário (ex.: trocar apenas o título),
        mantendo TODO o restante exatamente como está.
     4) Chame legal_pleading_patch_complete_analysis passando:
        - legalPleadingId
        - legalPleadingCompleteAnalysis com o conteúdo COMPLETO já atualizado
     5) Responda ao usuário com o JSON bruto retornado pela ferramenta (sem resumo, sem explicação).

   - Regras:
     - NUNCA peça para o usuário “informar o campo”.
     - NUNCA invente conteúdo que não veio do GET.
     - Se o usuário pedir “trocar apenas X e manter o resto”, no PATCH deve ir o texto inteiro,
       só com X alterado.

    SE o usuário pedir para alterar o conteúdo final da peça processual,
VOCÊ É OBRIGADO a:

1) Executar legal_pleading_get
2) Ler legalPleadingResult.legalPleadingCompleteAnalysis
3) Aplicar SOMENTE a alteração pedida
4) Executar legal_pleading_patch_complete_analysis
   SEMPRE com o HTML COMPLETO

   NUNCA chame legal_pleading_patch_complete_analysis
SEM ANTES ter feito legal_pleading_get


Exemplo de fluxo correto:
1) GET:
{
  "tool": "legal_pleading_get",
  "arguments": { "legalPleadingId": "d29abac2-7060-4d56-9c76-d8c03d1a467b" }
}

2) PATCH (com HTML completo atualizado):
{
  "tool": "legal_pleading_patch_complete_analysis",
  "arguments": {
    "legalPleadingId": "d29abac2-7060-4d56-9c76-d8c03d1a467b",
    "legalPleadingCompleteAnalysis": "<p># Santos Futebol Clube ...restante idêntico...</p>\n"
  }
}

9. cnis_fast_analysis_patch_complete_analysis
   - Descrição: Atualiza o TEXTO COMPLETO do resultado da análise rápida do CNIS, no campo:
     cnisFastAnalysisResult.cnisCompleteAnalysis

   - Objetivo: permitir editar/aprimorar o texto final do CNIS SEM perder o restante do conteúdo.

   - Parâmetros aceitos (OBRIGATÓRIOS):
     - cnisFastAnalysisId (string)
     - cnisCompleteAnalysis (string)  <-- SEMPRE enviar o TEXTO COMPLETO final

   - Processo obrigatório (edição correta e segura):
     1) SEMPRE chame cnis_fast_analysis_get com o cnisFastAnalysisId para obter o JSON completo do CNIS.
     2) Extraia o valor atual em:
        cnisFastAnalysisResult.cnisCompleteAnalysis
     3) Aplique SOMENTE a alteração pedida pelo usuário (ex.: inserir um número de processo, trocar um título, etc.)
        sem reescrever/parafrasear o restante.
     4) Envie o PATCH usando cnis_fast_analysis_patch_complete_analysis com:
        - o cnisFastAnalysisId
        - o cnisCompleteAnalysis COMPLETO atualizado

Exemplo:
{
  "tool": "cnis_fast_analysis_patch_complete_analysis",
  "arguments": {
    "cnisFastAnalysisId": "...",
    "cnisCompleteAnalysis": "texto completo atualizado aqui..."
  }
}

REGRAS IMPORTANTES:
- NUNCA invente IDs.
- Para usar ferramentas, responda APENAS em JSON puro, sem texto adicional.
- Qualquer solicitação que implique ALTERAR/ATUALIZAR dados (ex.: adicionar legalProceedingNumber)
  DEVE resultar em chamada de ferramenta. NUNCA responda em texto explicativo nesses casos.
- Para adicionar legalProceedingNumber no CNIS:
  1) chame cnis_fast_analysis_get
  2) depois chame cnis_fast_analysis_patch

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
          ListDataRequestDto.build({
            ...toolCall.arguments,
            page,
            limit,
          }),
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'analysis_tool_client_get': {
        const analysisToolClientId = toolCall.arguments.analysisToolClientId;

        const result =
          await this.mcp.analysisToolClientGet(analysisToolClientId);

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'cnis_fast_analysis_patch': {
        const { cnisFastAnalysisId, json, cnisDocumentPath } =
          toolCall.arguments;

        if (
          typeof cnisFastAnalysisId !== 'string' ||
          cnisFastAnalysisId.length === 0
        ) {
          return {
            content: [
              {
                type: 'text',
                text: 'Parâmetro inválido: cnisFastAnalysisId é obrigatório.',
              },
            ],
            isError: true,
          };
        }

        // Aceitar json como object OU como string JSON (robustez)
        let parsedJson: unknown = json;

        if (typeof parsedJson === 'string') {
          try {
            parsedJson = JSON.parse(parsedJson);
          } catch {
            return {
              content: [
                {
                  type: 'text',
                  text: 'Parâmetro inválido: json string não é um JSON válido.',
                },
              ],
              isError: true,
            };
          }
        }

        if (typeof parsedJson !== 'object' || parsedJson === null) {
          return {
            content: [
              {
                type: 'text',
                text: 'Parâmetro inválido: json deve ser um objeto.',
              },
            ],
            isError: true,
          };
        }

        const safeDocumentPath =
          typeof cnisDocumentPath === 'string' ? cnisDocumentPath.trim() : '';
        const hasDocumentPath = safeDocumentPath.length > 0;

        const result = await this.mcp.cnisFastAnalysisPatch({
          cnisFastAnalysisId,
          json: parsedJson as JsonObjectInterface,
          ...(hasDocumentPath ? { cnisDocumentPath: safeDocumentPath } : {}),
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'cnis_fast_analysis_post': {
        const result = await this.mcp.cnisFastAnalysisPost(
          toolCall.arguments.cnisFastAnalysisId,
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'legal_pleading_patch_complete_analysis': {
        const { legalPleadingId, legalPleadingCompleteAnalysis } =
          toolCall.arguments;

        const result = await this.mcp.legalPleadingPatch({
          legalPleadingId,
          legalPleadingCompleteAnalysis,
        });

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }

      case 'cnis_fast_analysis_patch_complete_analysis': {
        const { cnisFastAnalysisId, cnisCompleteAnalysis } = toolCall.arguments;

        const result = await this.mcp.cnisFastAnalysisPatchCompleteAnalysis({
          cnisFastAnalysisId,
          cnisCompleteAnalysis,
        });

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
