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
          content: dto.messge,
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
      { role: 'user', content: dto.messge },
    ];

    const rawText = await this.gemini.chat(geminiMessages);

    const toolCall = this.tryParseToolCall(rawText);

    const transactions = [];

    if (toolCall) {
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

      const toolResponse = await this.executeToolWithPolicyGuard(
        toolCall,
        policy,
        toolResult,
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
            } satisfies ConversationToolResultPayloadInterface,
            createdAt: new Date(),
          }),
        );

      let assistantText = JSON.stringify(toolResponse, null, 2);

      if (this.isTextContentEnvelope(toolResponse)) {
        const first = toolResponse.content[0];
        assistantText = first.text;
      }

      const createAssistantMessageTx =
        this.conversationMessageCommandRepositoryGateway.createConversationMessage(
          new ConversationMessageEntity({
            conversation: this.toConversationRef(conversation),
            role: ConversationMessageRoleTypeEnum.ASSISTANT,
            content: assistantText,
            createdAt: new Date(),
          }),
        );

      const updateLastAiMessageAtTx =
        this.conversationCommandRepositoryGateway.updateLastAIMessageAt(
          dto.conversationId,
          new Date(),
        );

      transactions.push(
        createToolCallEventTx,
        createToolResultEventTx,
        createAssistantMessageTx,
        updateLastAiMessageAtTx,
      );

      const tx2 =
        await this.baseTransactionRepositoryGateway.execute(transactions);
      await tx2.commit();

      return SendMessageToConversationResponseDto.build({
        content: [
          AiConversationResponseDto.build({
            type: 'text',
            text: assistantText,
          }),
        ],
      });
    }

    const createAssistantMessageTx =
      this.conversationMessageCommandRepositoryGateway.createConversationMessage(
        new ConversationMessageEntity({
          conversation: this.toConversationRef(conversation),
          role: ConversationMessageRoleTypeEnum.ASSISTANT,
          content: rawText,
          createdAt: new Date(),
        }),
      );

    const updateLastAiMessageAtTx =
      this.conversationCommandRepositoryGateway.updateLastAIMessageAt(
        dto.conversationId,
        new Date(),
      );

    const tx2 = await this.baseTransactionRepositoryGateway.execute([
      createAssistantMessageTx,
      updateLastAiMessageAtTx,
    ]);
    await tx2.commit();

    return SendMessageToConversationResponseDto.build({
      content: [
        AiConversationResponseDto.build({ type: 'text', text: rawText }),
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

      REGRAS:
      - Se precisar usar ferramenta, responda APENAS com JSON puro (sem markdown).
      - Formato: {"tool":"nome_da_ferramenta","arguments":{...}}
      - Caso não precise ferramenta, responda normalmente em texto.
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
      const id =
        baseArgs['legalPleadingId'] ??
        baseArgs['legal_pleading_id'] ??
        baseArgs['id'];

      if (typeof id === 'string') {
        normalizedArgs = { legalPleadingId: id };
      }
    }

    const args = this.isLikelyListTool(toolCall.tool)
      ? this.normalizePaginationArgs(normalizedArgs)
      : normalizedArgs;

    return this.mcp.callTool(toolCall.tool, args);
  }
}
