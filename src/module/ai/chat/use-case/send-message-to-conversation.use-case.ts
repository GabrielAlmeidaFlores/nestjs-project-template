import { ListToolsResult } from '@modelcontextprotocol/sdk/types';
import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { ConversationEventCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-event/command/conversation-message.command.repository.gateway';
import { ConversationMessageCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-message/command/conversation-message.command.repository.gateway';
import { ConversationToolPolicyQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-tool-policy/query/conversation.query.repository.gateway';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationStatusTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationEventEntity } from '@module/ai/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import {
  ConversationEventPayloadType,
  ConversationToolResultPayloadInterface,
} from '@module/ai/chat/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import { ConversationEventTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import { ConversationMessageEntity } from '@module/ai/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import { ConversationMessageRoleTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import { SendMessageToConversationRequestDto } from '@module/ai/chat/dto/request/send-message-to-conversation.request.dto';
import {
  AiConversationResponseDto,
  SendMessageToConversationResponseDto,
} from '@module/ai/chat/dto/response/send-message-to-conversation.response.dto';
import { ConversationNotFoundError } from '@module/ai/chat/error/conversation-not-found.erro';
import { GeminiClient } from '@module/ai/gemini/gemini.service';
import {
  AiResponseInterface,
  AiToolCallType,
} from '@module/ai/gemini/types/tool-call.interface';
import { McpUseCase } from '@module/ai/mcp/use-case/mcp.use-case';
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

    const rawText = await this.gemini.chat([
      { role: `assistant`, content: systemPrompt },
      { role: 'user', content: dto.messge },
    ]);

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

      const assistantText = JSON.stringify(toolResponse, null, 2);

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

    if (typeof tool !== 'string') {
      return false;
    }
    if (typeof args !== 'object' || args === null) {
      return false;
    }

    return tool === 'consultar_pje' || tool === 'consultar_usuarios';
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
  ): boolean {
    if (policy?.toolsEnable === false) {
      return false;
    }

    const permissions = policy?.toolPermission ?? null;
    if (!Array.isArray(permissions) || permissions.length === 0) {
      return true;
    }

    return permissions.some((p) => p.toolName === toolName);
  }

  private async executeToolWithPolicyGuard(
    toolCall: AiToolCallType,
    policy: ConversationToolPolicySnapshotType,
  ): Promise<
    Awaited<ReturnType<McpUseCase['consultarUsuarios']>> | AiResponseInterface
  > {
    if (!this.isToolAllowed(toolCall.tool, policy)) {
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

    if (toolCall.tool === 'consultar_pje') {
      return this.mcp.consultarPje(toolCall.arguments.numeroProcesso);
    }

    return this.mcp.consultarUsuarios();
  }
}
