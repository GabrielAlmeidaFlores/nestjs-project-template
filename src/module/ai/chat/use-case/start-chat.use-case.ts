import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ConversationCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/command/conversation.command.repository.gateway';
import { ConversationToolPolicyCommandRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-tool-policy/command/conversation-message.command.repository.gateway';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationStatusTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ConversationToolPolicyEntity } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import { ChatPersonaTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { StartChatRequestDto } from '@module/ai/chat/dto/request/start-chat.request.dto';
import { StartChatResponseDto } from '@module/ai/chat/dto/response/start-chat.response.dto';
import { ChatPersonaNotFoundError } from '@module/ai/chat/error/chat-persona-found.erro copy';
import { PERSONA_PROMPTS } from '@module/ai/chat/lib/persona-prompt';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class StartChatUseCase {
  protected readonly _type = StartChatUseCase.name;

  public constructor(
    @Inject(ConversationCommandRepositoryGateway)
    private readonly conversationCommandRepositoryGateway: ConversationCommandRepositoryGateway,
    @Inject(ConversationToolPolicyCommandRepositoryGateway)
    private readonly conversationToolPolicyCommandRepositoryGateway: ConversationToolPolicyCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: StartChatRequestDto,
  ): Promise<StartChatResponseDto> {
    const now = new Date();

    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const persona: ChatPersonaTypeEnum | undefined = dto.assistantType;

    if (persona === undefined) {
      throw new ChatPersonaNotFoundError();
    }

    const personaPrompt = PERSONA_PROMPTS[persona];

    const conversation = new ConversationEntity({
      customerId: customer.id,
      assistantType: persona,
      status: null,
      lastAIMessageAt: null,
      archivedAt: null,
      createdAt: now,
    });

    const policy = new ConversationToolPolicyEntity({
      conversation: this.toConversationRef(conversation),
      toolsEnable: true,
      toolPermission: null,
      defaultExecutionMode: null,

      persona,
      personaPrompt,

      createdAt: now,
      updatedAt: now,
    });

    const createConversationTx =
      this.conversationCommandRepositoryGateway.createConversation(
        conversation,
      );

    const createPolicyTx =
      this.conversationToolPolicyCommandRepositoryGateway.createConversationToolPolicy(
        policy,
      );

    const tx = await this.baseTransactionRepositoryGateway.execute([
      createConversationTx,
      createPolicyTx,
    ]);
    await tx.commit();

    return StartChatResponseDto.build({ conversationId: conversation.id });
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
}
