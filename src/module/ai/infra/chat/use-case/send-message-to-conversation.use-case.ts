import { ListToolsResult } from '@modelcontextprotocol/sdk/types';
import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { ConversationEventCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-event/command/conversation-message.command.repository.gateway';
import { ConversationMessageCommandRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-message/command/conversation-message.command.repository.gateway';
import { ConversationMessageQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-message/query/conversation-message.query.repository.gateway';
import { ChatMessageToConversationQueryParam } from '@module/ai/infra/chat/domain/repository/conversation-message/query/param/chat-message-to-conversation.query.param';
import { GetChatMessagesToConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation-message/query/result/get-chat-messages-to-conversation.query.result';
import { ConversationToolPolicyQueryRepositoryGateway } from '@module/ai/infra/chat/domain/repository/conversation-tool-policy/query/conversation.query.repository.gateway';
import { ConversationEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationEventEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import {
  ConversationEventPayloadType,
  ConversationToolResultPayloadInterface,
} from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import { ConversationEventTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import { ConversationMessageRoleTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import { SendMessageToConversationRequestDto } from '@module/ai/infra/chat/dto/request/send-message-to-conversation.request.dto';
import {
  SendMessageToConversationResponseDto,
  AiConversationResponseDto,
} from '@module/ai/infra/chat/dto/response/send-message-to-conversation.response.dto';
import { ConversationNotFoundError } from '@module/ai/infra/chat/error/conversation-not-found.erro';
import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import {
  AiToolCallType,
  AiResponseInterface,
} from '@module/ai/infra/gemini/types/tool-call.interface';
import {
  JsonObjectInterface,
  JsonValueType,
  McpUseCase,
} from '@module/ai/infra/mcp/use-case/mcp.use-case';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

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
      dto.conversationId,
    );

    if (!conversation) {
      throw new ConversationNotFoundError();
    }

    const createUserMessageTx =
      this.conversationMessageCommandRepositoryGateway.createConversationMessage(
        new ConversationMessageEntity({
          conversation: this.toConversationRef(conversation),
          role: ConversationMessageRoleTypeEnum.USER,
          content: dto.message,
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
        new ChatMessageToConversationQueryParam(dto),
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
      { role: 'user', content: dto.message },
    ];

    const MAX_TOOL_STEPS = 3;

    // Vamos trabalhar sobre uma cópia mutável do histórico que será enviado ao Gemini
    const toolLoopMessages: GeminiMsgType[] = [...geminiMessages];

    let finalAssistantText: string | null = null;

    for (let step = 0; step < MAX_TOOL_STEPS; step++) {
      const rawText = await this.gemini.chat(toolLoopMessages);
      const toolCall = this.tryParseToolCall(rawText);

      if (!toolCall) {
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
            } satisfies ConversationEventPayloadType,
            createdAt: new Date(),
          }),
        );

      // Executa tool com policy
      const toolResponse = await this.executeToolWithPolicyGuard(
        toolCall,
        policy,
        toolResult,
        dto.message,
      );

      // Log TOOL_RESULT
      const createToolResultEventTx =
        this.conversationEventCommandRepositoryGateway.createConversationEvent(
          new ConversationEventEntity({
            conversation: this.toConversationRef(conversation),
            type: ConversationEventTypeEnum.TOOL_RESULT,
            name: toolCall.tool,
            payload: {
              tool: toolCall.tool,
              resultJson: JSON.stringify(toolResponse, null, 2),
            } satisfies ConversationToolResultPayloadInterface,
            createdAt: new Date(),
          }),
        );

      // Persistir eventos a cada iteração (mantém rastreabilidade)
      const txTool = await this.baseTransactionRepositoryGateway.execute([
        createToolCallEventTx,
        createToolResultEventTx,
      ]);
      await txTool.commit();

      // Alimentar o Gemini para a próxima iteração:
      // 1) registrar o JSON da tool-call como "assistant"
      toolLoopMessages.push({ role: 'assistant', content: rawText });

      // 2) registrar o resultado da tool como "user"
      // IMPORTANTE: mandar só texto (e não envelope inteiro) quando for envelope
      let toolText = JSON.stringify(toolResponse, null, 2);
      if (this.isTextContentEnvelope(toolResponse)) {
        toolText = toolResponse.content[0].text;
      }

      toolLoopMessages.push({ role: 'user', content: toolText });

      // Se a tool retornou erro, finaliza com o conteúdo do erro
      if (
        typeof toolResponse === 'object' &&
        toolResponse !== null &&
        'isError' in toolResponse &&
        (toolResponse as AiResponseInterface).isError === true
      ) {
        finalAssistantText = toolText;
        break;
      }

      // Continua loop: Gemini agora tem o estado atual + resultado e pode pedir a próxima tool (GET -> PATCH)
    }

    finalAssistantText ??= `Limite de ${MAX_TOOL_STEPS} execuções de ferramentas atingido.`;

    // Agora persiste a mensagem final do assistant
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
        dto.conversationId,
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

  private isTextContentEnvelope(value: unknown): value is {
    content: [
      { type: 'text'; text: string },
      ...Array<{ type: 'text'; text: string }>,
    ];
  } {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const v: Record<string, unknown> = value as Record<string, unknown>;
    const c: unknown = v['content'];

    if (!Array.isArray(c) || c.length === 0) {
      return false;
    }

    const first: unknown = c[0];

    if (typeof first !== 'object' || first === null) {
      return false;
    }

    const f: Record<string, unknown> = first as Record<string, unknown>;
    const typeVal: unknown = f['type'];
    const textVal: unknown = f['text'];

    return typeVal === 'text' && typeof textVal === 'string';
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

      const id = this.extractIdString(raw);

      if (id) {
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

      if (id) {
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

      if (id) {
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

      // (mantive seu comportamento atual)
      if (!id) {
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

      // 1) cnisDocumentPath (opcional)
      const cnisDocumentPathRaw: JsonValueType | undefined =
        baseArgs['cnisDocumentPath'];

      const cnisDocumentPath: string =
        typeof cnisDocumentPathRaw === 'string'
          ? cnisDocumentPathRaw.trim()
          : '';

      const hasDocumentPath: boolean = cnisDocumentPath.length > 0;

      // 2) json pode vir como object OU string
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

      // 3) Campos "soltos" fora de json
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
        const arr = rootLegalProceeding.filter(
          (v): v is string => typeof v === 'string' && v.trim().length > 0,
        );
        if (arr.length > 0) {
          patchPayload['legalProceedingNumber'] = arr;
        }
      }

      if (Array.isArray(rootInssBenefit)) {
        const arr = rootInssBenefit.filter(
          (v): v is string => typeof v === 'string' && v.trim().length > 0,
        );
        if (arr.length > 0) {
          patchPayload['inssBenefitNumber'] = arr;
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
        patchResult !== null &&
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

      const postResult = await this.mcp.callTool('cnis_fast_analysis_post', {
        cnisFastAnalysisId: id,
      });

      if (this.isTextContentEnvelope(postResult)) {
        return {
          content: [
            {
              type: 'text',
              text: postResult.content[0].text,
            },
          ],
        };
      }

      // fallback seguro
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(postResult, null, 2),
          },
        ],
      };
    }

    return this.mcp.callTool(toolCall.tool, args);
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
}
