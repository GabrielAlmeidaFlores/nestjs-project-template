import { ListToolsResult } from '@modelcontextprotocol/sdk/types';
import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationEventCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-event/command/conversation-message.command.repository.gateway';
import { ConversationMessageCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-message/command/conversation-message.command.repository.gateway';
import { ConversationMessageQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-message/query/conversation-message.query.repository.gateway';
import { ChatMessageToConversationQueryParam } from '@module/ai/infra/chat/domain/repository/conversation-message/query/param/chat-message-to-conversation.query.param';
import { GetChatMessagesToConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation-message/query/result/get-chat-messages-to-conversation.query.result';
import { ConversationToolPolicyQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-tool-policy/query/conversation.query.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { ConversationEventEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import { ConversationEventTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import { ConversationMessageRoleTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { SendMessageToConversationRequestDto } from '@module/ai/infra/chat/dto/request/send-message-to-conversation.request.dto';
import {
  AiConversationResponseDto,
  SendMessageToConversationResponseDto,
} from '@module/ai/infra/chat/dto/response/send-message-to-conversation.response.dto';
import { ConversationNotFoundError } from '@module/ai/infra/chat/error/conversation-not-found.erro';
import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import {
  AiResponseInterface,
  AiToolCallType,
} from '@module/ai/infra/gemini/types/tool-call.interface';
import {
  JsonObjectInterface,
  JsonValueType,
  McpUseCase,
} from '@module/ai/infra/mcp/use-case/mcp.use-case';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

export type ConversationToolPolicySnapshotType = {
  toolsEnable?: boolean | null;
  personaPrompt?: string | null;
  persona?: string | null;
  toolPermission?: { toolName: string }[] | null;
} | null;

@Injectable()
export class SendMessageToConversationUseCase {
  protected readonly _type = SendMessageToConversationUseCase.name;

  public constructor(
    @Inject(ConversationQueryRepositoryGateway)
    private readonly conversationQueryRepositoryGateway: ConversationQueryRepositoryGateway,
    @Inject(ConversationCommandRepositoryGateway)
    private readonly conversationCommandRepositoryGateway: ConversationCommandRepositoryGateway,
    @Inject(ConversationMessageCommandRepositoryGateway)
    private readonly conversationMessageCommandRepositoryGateway: ConversationMessageCommandRepositoryGateway,
    @Inject(ConversationEventCommandRepositoryGateway)
    private readonly conversationEventCommandRepositoryGateway: ConversationEventCommandRepositoryGateway,
    @Inject(ConversationToolPolicyQueryRepositoryGateway)
    private readonly conversationToolPolicyQueryRepositoryGateway: ConversationToolPolicyQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConversationMessageQueryRepositoryGateway)
    private readonly conversationMessageQueryRepositoryGateway: ConversationMessageQueryRepositoryGateway,

    private readonly gemini: GeminiClient,
    private readonly mcp: McpUseCase,
  ) {}

  public async execute(
    dto: SendMessageToConversationRequestDto,
  ): Promise<SendMessageToConversationResponseDto> {
    const now = new Date();

    const conversation = await this.conversationQueryRepositoryGateway.findById(
      dto.json.conversationId,
    );

    if (!conversation) {
      throw new ConversationNotFoundError();
    }

    let conversationUpdated;
    if (conversation.title === null || conversation.title === undefined) {
      conversationUpdated = new ConversationEntity({
        ...conversation,
        title: dto.json.message,
      });
      const updateTx =
        this.conversationCommandRepositoryGateway.updateConversation(
          conversation.id,
          conversationUpdated,
        );
      const updateConversation =
        await this.baseTransactionRepositoryGateway.execute([updateTx]);
      await updateConversation.commit();
    }

    const createUserMessageTx =
      this.conversationMessageCommandRepositoryGateway.createConversationMessage(
        new ConversationMessageEntity({
          conversation: this.toConversationRef(conversation),
          role: ConversationMessageRoleTypeEnum.USER,
          content: dto.json.message,
          createdAt: now,
        }),
      );

    const tx1 = await this.baseTransactionRepositoryGateway.execute([
      createUserMessageTx,
    ]);
    await tx1.commit();

    const policy =
      await this.conversationToolPolicyQueryRepositoryGateway.getByConversationId(
        conversation.id,
      );
    const toolResult: ListToolsResult = await this.mcp.listTools();

    const systemPrompt = this.buildSystemPromptFromPolicy(toolResult, policy);
    type GeminiMsgType = { role: 'assistant' | 'user'; content: string };

    const history =
      await this.conversationMessageQueryRepositoryGateway.listByConversationIdAndCustomerId(
        new ChatMessageToConversationQueryParam(dto.json),
      );

    const MAX_HISTORY = 10;

    const looksLikeJson = (s: string): boolean => {
      const t = s.trim();
      return (
        (t.startsWith('{') && t.endsWith('}')) ||
        (t.startsWith('[') && t.endsWith(']'))
      );
    };

    const geminiHistory: GeminiMsgType[] = history.resource
      .filter(
        (
          m,
        ): m is GetChatMessagesToConversationQueryResult & {
          content: string;
        } => typeof m.content === 'string' && m.content.trim().length > 0,
      )
      .map(
        (m): GeminiMsgType => ({
          role:
            m.role === ConversationMessageRoleTypeEnum.USER
              ? ('user' as const)
              : ('assistant' as const),
          content: m.content.trim(),
        }),
      )
      .filter((m) => !(m.role === 'assistant' && looksLikeJson(m.content)))
      .slice(-MAX_HISTORY);

    const geminiMessages: GeminiMsgType[] = [
      { role: 'assistant', content: systemPrompt },
      ...geminiHistory,
      { role: 'user', content: dto.json.message },
    ];

    // Collect files (support single or multiple possibilities coming from DTO)
    const filesFromDto: Array<{ mimeType: string; data: Buffer }> = [];
    const maybeFiles = (dto as any).files ?? [];

    if (maybeFiles.length > 0) {
      const arr = Array.isArray(maybeFiles) ? maybeFiles : [maybeFiles];
      for (const f of arr) {
        if (!f) {
          continue;
        }
        // MemoryStoredFile from nestjs-form-data exposes `buffer` and `mimetype`
        const buf: Buffer | undefined = f.buffer ?? f.data ?? undefined;
        const mime: string | undefined =
          f.mimetype ?? f.mimeType ?? f.mime ?? undefined;
        if (buf && Buffer.isBuffer(buf)) {
          filesFromDto.push({
            mimeType: mime ?? 'application/octet-stream',
            data: buf,
          });
        }
      }
    }

    const MAX_TOOL_STEPS = 8;

    const toolLoopMessages: GeminiMsgType[] = [...geminiMessages];

    let finalAssistantText: string | null = null;

    for (let step = 0; step < MAX_TOOL_STEPS; step++) {
      const rawText = await this.gemini.chat(
        toolLoopMessages,
        step === 0 ? filesFromDto : undefined,
      );
      const toolCall = this.tryParseToolCall(rawText);

      if (!toolCall) {
        if (this.looksLikeUpdateRequest(dto.json.message)) {
          toolLoopMessages.push({
            role: 'assistant',
            content: rawText,
          });

          toolLoopMessages.push({
            role: 'user',
            content:
              'ATENÇÃO: este pedido implica ALTERAÇÃO/ATUALIZAÇÃO. Responda APENAS com JSON puro de ferramenta no formato {"tool":"...","arguments":{...}}. ' +
              'Se for CNIS Fast Analysis: siga obrigatoriamente cnis_fast_analysis_get -> cnis_fast_analysis_patch. ' +
              'No PATCH, envie sempre arguments.cnisFastAnalysisId e arguments.json (objeto) com os campos editáveis. ' +
              'Se o usuário pedir para ADICIONAR sem remover, faça merge: leia o array atual no GET e envie o array completo no PATCH. ' +
              'Se for Legal Pleading: siga obrigatoriamente legal_pleading_get -> editar somente o pedido -> legal_pleading_patch_complete_analysis com o conteúdo COMPLETO.',
          });

          continue;
        }

        finalAssistantText = rawText;
        break;
      }

      const createToolCallEventTx =
        this.conversationEventCommandRepositoryGateway.createConversationEvent(
          new ConversationEventEntity({
            conversation: this.toConversationRef(conversation),
            type: ConversationEventTypeEnum.TOOL_CALL,
            name: toolCall.tool,
            payload: {
              tool: toolCall.tool,
              arguments: toolCall.arguments,
            },
            createdAt: new Date(),
          }),
        );

      const toolResponse = await this.executeToolWithPolicyGuard(
        toolCall,
        policy,
        toolResult,
        dto.json.message,
      );

      const createToolResultEventTx =
        this.conversationEventCommandRepositoryGateway.createConversationEvent(
          new ConversationEventEntity({
            conversation: this.toConversationRef(conversation),
            type: ConversationEventTypeEnum.TOOL_RESULT,
            name: toolCall.tool,
            payload: {
              tool: toolCall.tool,
              resultJson: JSON.stringify(toolResponse, null, 2),
            },
            createdAt: new Date(),
          }),
        );

      const txTool = await this.baseTransactionRepositoryGateway.execute([
        createToolCallEventTx,
        createToolResultEventTx,
      ]);
      await txTool.commit();

      toolLoopMessages.push({ role: 'assistant', content: rawText });

      const toolText = this.formatToolResultForModel(toolResponse);
      toolLoopMessages.push({ role: 'user', content: toolText });

      if (
        typeof toolResponse === 'object' &&
        'isError' in toolResponse &&
        (toolResponse as AiResponseInterface).isError === true
      ) {
        finalAssistantText = toolText;
        break;
      }

      if (toolCall.tool === 'legal_pleading_patch_complete_analysis') {
        finalAssistantText = toolText;
        break;
      }

      if (toolCall.tool === 'cnis_fast_analysis_patch') {
        finalAssistantText = toolText;
        break;
      }

      if (toolCall.tool === 'cnis_fast_analysis_patch_complete_analysis') {
        finalAssistantText = toolText;
        break;
      }
    }

    finalAssistantText ??= `Limite de ${MAX_TOOL_STEPS} execuções de ferramentas atingido.`;

    const createAssistantMessageTx =
      this.conversationMessageCommandRepositoryGateway.createConversationMessage(
        new ConversationMessageEntity({
          conversation: this.toConversationRef(conversation),
          role: ConversationMessageRoleTypeEnum.ASSISTANT,
          content: finalAssistantText,
          createdAt: new Date(),
        }),
      );

    const updateLastAiMessageAtTx =
      this.conversationCommandRepositoryGateway.updateLastAIMessageAt(
        dto.json.conversationId,
        new Date(),
      );

    const txFinal = await this.baseTransactionRepositoryGateway.execute([
      createAssistantMessageTx,
      updateLastAiMessageAtTx,
    ]);
    await txFinal.commit();

    return SendMessageToConversationResponseDto.build({
      content: [
        AiConversationResponseDto.build({
          type: 'text',
          text: finalAssistantText,
        }),
      ],
    });
  }

  private toIntOrUndefined(value: unknown): number | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) ? Math.trunc(value) : undefined;
    }

    if (typeof value === 'string') {
      const s = value.trim();
      if (!s) {
        return undefined;
      }
      const n = Number(s);
      return Number.isFinite(n) ? Math.trunc(n) : undefined;
    }

    return undefined;
  }

  private normalizePaginationArgs(
    args: JsonObjectInterface,
  ): JsonObjectInterface {
    const out: Record<string, unknown> = { ...args };
    const max = 100;
    const min = 10;

    const page = this.toIntOrUndefined(out['page']);
    out['page'] = page !== undefined && page > 0 ? page : 1;

    const limit = this.toIntOrUndefined(out['limit']);
    const safe = limit !== undefined && limit > 0 ? Math.min(limit, max) : min;
    out['limit'] = safe;

    return out as JsonObjectInterface;
  }

  private isLikelyListTool(toolName: string): boolean {
    const name = toolName.trim().toLowerCase();
    return (
      name.includes('list') ||
      name.endsWith('_list') ||
      name.startsWith('list_')
    );
  }

  private isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private toConversationRef(conversation: {
    id: ConversationId | string;
    assistantType?: string | null;
    status?: ConversationStatusTypeEnum | null;
    lastAIMessageAt?: Date | null;
    archivedAt?: Date | null;
    createdAt?: Date;
    customerId?: CustomerId | string | null;
  }): ConversationEntity {
    const id =
      conversation.id instanceof ConversationId
        ? conversation.id
        : new ConversationId(conversation.id);

    const customerId: CustomerId | null =
      conversation.customerId instanceof CustomerId
        ? conversation.customerId
        : this.isNonEmptyString(conversation.customerId)
          ? new CustomerId(conversation.customerId)
          : null;

    return new ConversationEntity({
      id,
      customerId,
      assistantType: conversation.assistantType ?? null,
      status: conversation.status ?? null,
      lastAIMessageAt: conversation.lastAIMessageAt ?? null,
      archivedAt: conversation.archivedAt ?? null,
      createdAt: conversation.createdAt ?? new Date(),

      conversationMessage: null,
      conversationEvent: null,
      conversationToolPolicy: null,
    });
  }

  private buildSystemPromptFromPolicy(
    tools: ListToolsResult,
    policy: ConversationToolPolicySnapshotType,
  ): string {
    const toolsEnabled = policy?.toolsEnable !== false;

    const permissions = policy?.toolPermission ?? null;
    const hasPermissionList =
      Array.isArray(permissions) && permissions.length > 0;

    const allowedTools = hasPermissionList
      ? tools.tools.filter((t) =>
          permissions.some((p) => p.toolName === t.name),
        )
      : tools.tools;

    const toolsText = toolsEnabled
      ? allowedTools
          .map((t) => `- ${t.name}: ${t.description ?? ''}`)
          .join('\n')
      : 'Ferramentas desativadas para esta conversa.';

    const personaPromptRaw = policy?.personaPrompt;
    const personaPrompt =
      typeof personaPromptRaw === 'string' && personaPromptRaw.trim().length > 0
        ? personaPromptRaw.trim()
        : '';
    return `
${personaPrompt}

Ferramentas disponíveis:
${toolsText}

REGRAS GERAIS:
- Se o usuário pedir QUALQUER ALTERAÇÃO/ATUALIZAÇÃO de dados, você DEVE usar ferramenta.
- Em pedidos de atualização, NUNCA responda em texto explicativo. Sempre execute as ferramentas.
- Para usar ferramenta, responda APENAS com JSON puro (sem markdown), exatamente neste formato:
  {"tool":"nome_da_ferramenta","arguments":{...}}

REGRA CNIS FAST ANALYSIS (OBRIGATÓRIA PARA QUALQUER UPDATE):
- Para alterar uma análise CNIS Fast Analysis:
  1) Sempre chame cnis_fast_analysis_get para obter o estado atual.
  2) Em seguida, chame cnis_fast_analysis_patch com as alterações.
- No cnis_fast_analysis_patch:
  - O ID deve ir em arguments.cnisFastAnalysisId (string UUID).
  - Todo campo editável deve ir dentro de arguments.json (objeto).
  - Se houver troca/reattach do documento CNIS, envie arguments.cnisDocumentPath (string path) além de arguments.json.
  - Nunca envie campos editáveis na raiz de arguments (ex.: NÃO enviar legalProceedingNumber direto; deve ser json.legalProceedingNumber).

LEGAL PLEADING (OBRIGATÓRIO PARA QUALQUER UPDATE NA PEÇA PROCESSUAL):
- Sempre que o usuário pedir para ALTERAR/ATUALIZAR o conteúdo final da peça processual
  (ex.: trocar título, corrigir um trecho, ajustar formatação, substituir uma palavra, etc),
  você DEVE executar EXATAMENTE este fluxo:

  1) Chamar legal_pleading_get com o legalPleadingId
  2) Ler o campo: legalPleadingResult.legalPleadingCompleteAnalysis
  3) Aplicar SOMENTE a alteração solicitada, mantendo TODO o resto idêntico
  4) Chamar legal_pleading_patch_complete_analysis com:
     - legalPleadingId
     - legalPleadingCompleteAnalysis (o conteúdo COMPLETO final, já atualizado)

- Regras:
  - NUNCA invente conteúdo que não veio do GET.
  - NUNCA resuma. NUNCA explique. Em updates, sua resposta deve ser somente JSON de tool call.
  - Se o usuário fornecer um UUID na mensagem, use esse UUID como legalPleadingId.
  - Se o usuário não fornecer ID, use legal_pleading_list para localizar a peça e então legal_pleading_get.

Exemplo de tool call (formato obrigatório, JSON puro):
{"tool":"legal_pleading_get","arguments":{"legalPleadingId":"<UUID>"}}

Depois do GET, exemplo de PATCH (com HTML/TEXTO COMPLETO):
{"tool":"legal_pleading_patch_complete_analysis","arguments":{"legalPleadingId":"<UUID>","legalPleadingCompleteAnalysis":"<conteúdo completo com a alteração mínima>"}}

REGRA CNIS FAST ANALYSIS - TEXTO COMPLETO (OBRIGATÓRIA PARA UPDATE DO TEXTO FINAL):
- Sempre que o usuário pedir para ALTERAR/ATUALIZAR o conteúdo final do CNIS
  (ex.: trocar título dentro do texto, corrigir um trecho, inserir informação no texto final, etc),
  você DEVE executar EXATAMENTE este fluxo:

  1) Chamar cnis_fast_analysis_get com o cnisFastAnalysisId
  2) Ler o campo: cnisFastAnalysisResult.cnisCompleteAnalysis
  3) Aplicar SOMENTE a alteração solicitada, mantendo TODO o resto idêntico
  4) Chamar cnis_fast_analysis_patch_complete_analysis com:
     - cnisFastAnalysisId
     - cnisCompleteAnalysis (o conteúdo COMPLETO final, já atualizado)

- Regras:
  - NUNCA invente conteúdo que não veio do GET.
  - NUNCA resuma. NUNCA explique. Em updates, sua resposta deve ser somente JSON de tool call.
  - Se o usuário fornecer um UUID na mensagem, use esse UUID como cnisFastAnalysisId.

POLÍTICA DE UPDATE (SEM REMOVER EXISTENTES):
- Se o usuário disser "sem remover os existentes", você deve fazer merge:
  - Buscar o valor atual via GET
  - Aplicar a adição/remoção no array
  - Enviar o array completo no PATCH

EXEMPLOS (TODOS DEVEM SEGUIR GET -> PATCH):

1) Adicionar legalProceedingNumber sem remover:
{"tool":"cnis_fast_analysis_patch","arguments":{"cnisFastAnalysisId":"<UUID>","json":{"legalProceedingNumber":["<EXISTENTE1>","<NOVO>"]}}}

2) Adicionar inssBenefitNumber sem remover:
{"tool":"cnis_fast_analysis_patch","arguments":{"cnisFastAnalysisId":"<UUID>","json":{"inssBenefitNumber":["<EXISTENTE1>","<NOVO>"]}}}

3) Atualizar qualquer outro campo editável (ex.: status/observações/campos textuais):
{"tool":"cnis_fast_analysis_patch","arguments":{"cnisFastAnalysisId":"<UUID>","json":{"<campo>":"<novo_valor>"}}}

4) Atualizar dados E reenviar documento CNIS:
{"tool":"cnis_fast_analysis_patch","arguments":{"cnisFastAnalysisId":"<UUID>","json":{"<campo>":"<novo_valor>"},"cnisDocumentPath":"/caminho/arquivo.pdf"}}
`.trim();
  }

  private tryParseToolCall(text: string): AiToolCallType | null {
    const cleaned = this.stripJsonCodeFence(text);
    try {
      const parsed: unknown = JSON.parse(cleaned);
      if (!this.isToolCall(parsed)) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  private isToolCall(value: unknown): value is AiToolCallType {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    if (!('tool' in value) || !('arguments' in value)) {
      return false;
    }

    const tool = (value as { tool: unknown }).tool;
    const args = (value as { arguments: unknown }).arguments;

    if (typeof tool !== 'string' || tool.trim().length === 0) {
      return false;
    }
    if (typeof args !== 'object' || args === null) {
      return false;
    }

    return true;
  }

  private getAllowedToolNames(
    tools: ListToolsResult,
    policy: ConversationToolPolicySnapshotType,
  ): Set<string> {
    const toolsEnabled = policy?.toolsEnable !== false;
    if (!toolsEnabled) {
      return new Set();
    }

    const permissions = policy?.toolPermission ?? null;
    const hasPermissionList =
      Array.isArray(permissions) && permissions.length > 0;

    const allowed = hasPermissionList
      ? tools.tools.filter((t) =>
          permissions.some((p) => p.toolName === t.name),
        )
      : tools.tools;

    return new Set(allowed.map((t) => t.name));
  }

  private stripJsonCodeFence(text: string): string {
    const trimmed = text.trim();
    if (trimmed.startsWith('```')) {
      return trimmed
        .replace(/^```[a-zA-Z]*\n?/, '')
        .replace(/\n?```$/, '')
        .trim();
    }
    return trimmed;
  }

  private extractUuidFromText(text: string): string | undefined {
    const match = text.match(
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/i,
    );
    return match?.[0];
  }

  private isToolAllowed(
    toolName: string,
    policy: ConversationToolPolicySnapshotType,
    tools: ListToolsResult,
  ): boolean {
    const allowedNames = this.getAllowedToolNames(tools, policy);
    return allowedNames.has(toolName);
  }

  private async executeToolWithPolicyGuard(
    toolCall: AiToolCallType,
    policy: ConversationToolPolicySnapshotType,
    tools: ListToolsResult,
    userMessage: string,
  ): Promise<
    Awaited<ReturnType<McpUseCase['callTool']>> | AiResponseInterface
  > {
    if (!this.isToolAllowed(toolCall.tool, policy, tools)) {
      return {
        content: [
          {
            type: 'text',
            text: 'Ferramenta não permitida para esta conversa.',
          },
        ],
        isError: true,
      };
    }

    const baseArgs = toolCall.arguments as JsonObjectInterface;

    let normalizedArgs: JsonObjectInterface = baseArgs;

    if (toolCall.tool === 'legal_pleading_get') {
      const raw =
        baseArgs['legalPleadingId'] ??
        baseArgs['legal_pleading_id'] ??
        baseArgs['analysis_id'] ??
        baseArgs['id'];

      let id = this.extractIdString(raw);

      id ??= this.extractUuidFromText(userMessage);

      if (id !== undefined) {
        normalizedArgs = { legalPleadingId: id };
      } else {
        return {
          content: [
            { type: 'text', text: 'Parâmetro inválido: legalPleadingId.' },
          ],
          isError: true,
        };
      }
    }

    if (toolCall.tool === 'cnis_fast_analysis_get') {
      const raw =
        baseArgs['cnisFastAnalysisId'] ??
        baseArgs['cnis_fast_analysis_id'] ??
        baseArgs['analysis_id'] ??
        baseArgs['id'];

      let id = this.extractIdString(raw);

      id ??= this.extractUuidFromText(userMessage);

      if (id !== undefined) {
        normalizedArgs = { cnisFastAnalysisId: id };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: cnisFastAnalysisId não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }
    }

    if (toolCall.tool === 'analysis_tool_client_get') {
      const raw =
        baseArgs['analysisToolClientId'] ??
        baseArgs['analysis_tool_client_id'] ??
        baseArgs['analysis_id'] ??
        baseArgs['id'];

      const id = this.extractIdString(raw);

      if (id !== undefined) {
        normalizedArgs = { analysisToolClientId: id };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: analysisToolClientId.',
            },
          ],
          isError: true,
        };
      }
    }

    if (toolCall.tool === 'cnis_fast_analysis_patch') {
      const raw =
        baseArgs['cnisFastAnalysisId'] ??
        baseArgs['cnis_fast_analysis_id'] ??
        baseArgs['analysis_id'] ??
        baseArgs['id'];

      let id: string | undefined = this.extractIdString(raw);
      id ??= this.extractUuidFromText(userMessage);

      if (id === undefined) {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: cnisFastAnalysisId não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }

      const current = await this.mcp.cnisFastAnalysisGet(
        new CnisFastAnalysisId(id),
      );
      const currentObj = current as unknown as {
        legalProceedingNumber?: unknown;
        inssBenefitNumber?: unknown;
      };

      const currentLegalProceeding: string[] = Array.isArray(
        currentObj.legalProceedingNumber,
      )
        ? (currentObj.legalProceedingNumber as unknown[])
            .filter(
              (v): v is string => typeof v === 'string' && v.trim().length > 0,
            )
            .map((v) => v.trim())
        : [];

      const currentInssBenefit: string[] = Array.isArray(
        currentObj.inssBenefitNumber,
      )
        ? (currentObj.inssBenefitNumber as unknown[])
            .filter(
              (v): v is string => typeof v === 'string' && v.trim().length > 0,
            )
            .map((v) => v.trim())
        : [];

      const cnisDocumentPathRaw: JsonValueType | undefined =
        baseArgs['cnisDocumentPath'];

      const cnisDocumentPath: string =
        typeof cnisDocumentPathRaw === 'string'
          ? cnisDocumentPathRaw.trim()
          : '';

      const hasDocumentPath: boolean = cnisDocumentPath.length > 0;

      const jsonRaw: JsonValueType | undefined = baseArgs['json'];

      let parsedJson: JsonObjectInterface | undefined;

      if (typeof jsonRaw === 'string') {
        const t: string = jsonRaw.trim();

        if (t.length > 0) {
          try {
            const parsed: unknown = JSON.parse(t);

            if (
              typeof parsed === 'object' &&
              parsed !== null &&
              !Array.isArray(parsed)
            ) {
              parsedJson = parsed as JsonObjectInterface;
            } else {
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
      } else if (
        typeof jsonRaw === 'object' &&
        jsonRaw !== null &&
        !Array.isArray(jsonRaw)
      ) {
        parsedJson = jsonRaw;
      }

      const rootLegalProceeding: JsonValueType | undefined =
        baseArgs['legalProceedingNumber'];

      const rootInssBenefit: JsonValueType | undefined =
        baseArgs['inssBenefitNumber'];

      type CnisFastAnalysisPatchPayloadType = JsonObjectInterface & {
        legalProceedingNumber?: string[];
        inssBenefitNumber?: string[];
      };

      const patchPayload: CnisFastAnalysisPatchPayloadType = {};

      if (parsedJson) {
        Object.assign(patchPayload, parsedJson);
      }

      if (Array.isArray(rootLegalProceeding)) {
        const arr = rootLegalProceeding
          .filter(
            (v): v is string => typeof v === 'string' && v.trim().length > 0,
          )
          .map((v) => v.trim());
        if (arr.length > 0) {
          patchPayload['legalProceedingNumber'] = arr;
        }
      }

      if (Array.isArray(rootInssBenefit)) {
        const arr = rootInssBenefit
          .filter(
            (v): v is string => typeof v === 'string' && v.trim().length > 0,
          )
          .map((v) => v.trim());
        if (arr.length > 0) {
          patchPayload['inssBenefitNumber'] = arr;
        }
      }

      const userWantsAdd = this.looksLikeAddRequest(userMessage);

      const inferredLegalProceeding =
        this.extractLegalProceedingNumbers(userMessage);
      const inferredInssBenefit = this.extractInssBenefitNumbers(userMessage);

      const mentionsBenefit = /(?:\bnb\b|\bbenef[ií]c|\binss\b)/i.test(
        userMessage,
      );

      if (userWantsAdd) {
        if (Array.isArray(patchPayload.legalProceedingNumber)) {
          patchPayload.legalProceedingNumber = this.mergeUniqueStrings(
            currentLegalProceeding,
            patchPayload.legalProceedingNumber,
          );
        }
        if (Array.isArray(patchPayload.inssBenefitNumber)) {
          patchPayload.inssBenefitNumber = this.mergeUniqueStrings(
            currentInssBenefit,
            patchPayload.inssBenefitNumber,
          );
        }

        const hasLegalInPayload = Array.isArray(
          patchPayload.legalProceedingNumber,
        );
        const hasInssInPayload = Array.isArray(patchPayload.inssBenefitNumber);

        if (!hasLegalInPayload && !hasInssInPayload) {
          if (mentionsBenefit && inferredInssBenefit.length > 0) {
            patchPayload.inssBenefitNumber = this.mergeUniqueStrings(
              currentInssBenefit,
              inferredInssBenefit,
            );
          } else if (inferredLegalProceeding.length > 0) {
            patchPayload.legalProceedingNumber = this.mergeUniqueStrings(
              currentLegalProceeding,
              inferredLegalProceeding,
            );
          }
        }
      }

      const hasJson: boolean = Object.keys(patchPayload).length > 0;

      if (!hasJson && !hasDocumentPath) {
        return {
          content: [{ type: 'text', text: 'Nada para atualizar.' }],
          isError: true,
        };
      }

      normalizedArgs = {
        cnisFastAnalysisId: id,
        ...(hasJson ? { json: patchPayload } : {}),
        ...(hasDocumentPath ? { cnisDocumentPath } : {}),
      };
    }

    if (toolCall.tool === 'legal_pleading_patch_complete_analysis') {
      const raw =
        baseArgs['legalPleadingId'] ??
        baseArgs['legal_pleading_id'] ??
        baseArgs['analysis_id'] ??
        baseArgs['id'];

      let id = this.extractIdString(raw);
      id ??= this.extractUuidFromText(userMessage);

      const contentRaw = baseArgs['legalPleadingCompleteAnalysis'];
      const content = typeof contentRaw === 'string' ? contentRaw : undefined;

      if (id === undefined) {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: legalPleadingId não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }

      if (content === undefined) {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: legalPleadingCompleteAnalysis não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }

      normalizedArgs = {
        legalPleadingId: id,
        legalPleadingCompleteAnalysis: content,
      };
    }

    if (toolCall.tool === 'cnis_fast_analysis_patch_complete_analysis') {
      const raw =
        baseArgs['cnisFastAnalysisId'] ??
        baseArgs['cnis_fast_analysis_id'] ??
        baseArgs['analysis_id'] ??
        baseArgs['id'];

      let id = this.extractIdString(raw);
      id ??= this.extractUuidFromText(userMessage);

      const contentRaw = baseArgs['cnisCompleteAnalysis'];
      const content = typeof contentRaw === 'string' ? contentRaw : undefined;

      if (id === undefined) {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: cnisFastAnalysisId não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }

      if (content === undefined || content.trim().length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: cnisCompleteAnalysis não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }

      normalizedArgs = {
        cnisFastAnalysisId: id,
        cnisCompleteAnalysis: content,
      };
    }

    const args: JsonObjectInterface = this.isLikelyListTool(toolCall.tool)
      ? this.normalizePaginationArgs(normalizedArgs)
      : normalizedArgs;

    if (toolCall.tool === 'cnis_fast_analysis_patch') {
      const patchResult = await this.mcp.callTool(
        'cnis_fast_analysis_patch',
        args,
      );

      if (
        typeof patchResult === 'object' &&
        'isError' in patchResult &&
        (patchResult as { isError?: boolean }).isError === true
      ) {
        return patchResult;
      }

      const idRaw: JsonValueType | undefined = args['cnisFastAnalysisId'];
      const id: string = typeof idRaw === 'string' ? idRaw.trim() : '';

      if (id.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: 'Parâmetro inválido: cnisFastAnalysisId não foi informado corretamente.',
            },
          ],
          isError: true,
        };
      }

      if ('cnisDocumentPath' in args) {
        const postResult = await this.mcp.callTool('cnis_fast_analysis_post', {
          cnisFastAnalysisId: id,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(postResult, null, 2),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(patchResult, null, 2),
          },
        ],
      };
    }

    return this.mcp.callTool(toolCall.tool, args);
  }

  private looksLikeUpdateRequest(message: string): boolean {
    return /(?:atualiz|alter|troque|substitu|mude|edite|corrig|patch)/i.test(
      message,
    );
  }

  private looksLikeAddRequest(message: string): boolean {
    return /(?:adicion|inclu|acresc|insir|coloque|append|somar|juntar)/i.test(
      message,
    );
  }

  private mergeUniqueStrings(base: string[], add: string[]): string[] {
    const out: string[] = [];
    const seen = new Set<string>();

    for (const v of base) {
      const s = typeof v === 'string' ? v.trim() : '';
      if (!s) {
        continue;
      }
      if (!seen.has(s)) {
        seen.add(s);
        out.push(s);
      }
    }

    for (const v of add) {
      const s = typeof v === 'string' ? v.trim() : '';
      if (!s) {
        continue;
      }
      if (!seen.has(s)) {
        seen.add(s);
        out.push(s);
      }
    }

    return out;
  }

  private normalizeDigitsOnly(value: string): string {
    return value.replace(/[^\d]/g, '');
  }

  private extractLegalProceedingNumbers(text: string): string[] {
    const results: string[] = [];

    const cnjMatches =
      text.match(/\b\d{7}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}\b/g) ?? [];
    for (const m of cnjMatches) {
      const digits = this.normalizeDigitsOnly(m);
      if (digits.length === 20) {
        results.push(digits);
      }
    }

    const digitsMatches = text.match(/\b\d{20}\b/g) ?? [];
    for (const m of digitsMatches) {
      const digits = this.normalizeDigitsOnly(m);
      if (digits.length === 20) {
        results.push(digits);
      }
    }

    return this.mergeUniqueStrings([], results);
  }

  private extractInssBenefitNumbers(text: string): string[] {
    const matches = text.match(/\b\d{8,12}\b/g) ?? [];
    const filtered = matches
      .map((m) => this.normalizeDigitsOnly(m))
      .filter((m) => m.length >= 8 && m.length <= 12);

    return this.mergeUniqueStrings([], filtered);
  }

  private extractIdString(value: unknown): string | undefined {
    if (typeof value === 'string') {
      const s = value.trim();
      return s.length > 0 ? s : undefined;
    }

    if (typeof value === 'object' && value !== null) {
      const v = value as Record<string, unknown>;

      const candidates = [
        v['id'],
        v['value'],
        v['cnisFastAnalysisId'],
        v['analysisToolClientId'],
        v['legalPleadingId'],
      ];

      for (const c of candidates) {
        if (typeof c === 'string' && c.trim().length > 0) {
          return c.trim();
        }
      }
    }

    return undefined;
  }

  private isTextContentEnvelope(
    value: unknown,
  ): value is { content: Array<{ type: 'text'; text: string }> } {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    const v = value as { content?: unknown };
    if (!Array.isArray(v.content) || v.content.length === 0) {
      return false;
    }

    return v.content.every((c: unknown) => {
      if (typeof c !== 'object' || c === null) {
        return false;
      }
      const cc = c as { type?: unknown; text?: unknown };
      return cc.type === 'text' && typeof cc.text === 'string';
    });
  }

  private formatToolResultForModel(value: unknown): string {
    if (this.isTextContentEnvelope(value)) {
      return value.content.map((c) => c.text).join('\n');
    }

    return JSON.stringify(value, null, 2);
  }
}
