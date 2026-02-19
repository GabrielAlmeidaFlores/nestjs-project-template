import { Inject, Injectable } from '@nestjs/common';

import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import {
  ConversationItemDto,
  ListConversationsResponseDto,
} from '@module/customer/ai-conversation/dto/response/list-conversations.response.dto';
import { ConversationModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/conversation.model';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListConversationsUseCase {
  protected readonly _type = ListConversationsUseCase.name;

  private readonly allowedConversationTypes: PaymentPlanPaidResourceTypeEnum[];

  public constructor(
    @Inject(ConversationCacheGateway)
    private readonly conversationCacheGateway: ConversationCacheGateway,
  ) {
    this.allowedConversationTypes = [
      PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS,
      PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_LEGISLATION_QUESTIONS,
      PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH,
    ];
  }

  public async execute(
    sessionData: SessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<ListConversationsResponseDto> {
    const allConversations =
      await this.conversationCacheGateway.listConversationsByAuthIdentity(
        sessionData.authIdentityId,
        undefined,
        dto.search,
      );
    const filteredConversations =
      this.filterConversationsByAllowedTypes(allConversations);

    const startIndex = (dto.page - 1) * dto.limit;
    const endIndex = startIndex + dto.limit;
    const paginatedConversations = filteredConversations.slice(
      startIndex,
      endIndex,
    );

    const conversationItems = paginatedConversations.map((conversation) =>
      ConversationItemDto.build({
        id: conversation.id,
        title: conversation.title,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      }),
    );

    const totalItems = filteredConversations.length;
    const totalPages = Math.ceil(totalItems / dto.limit);

    return ListConversationsResponseDto.build({
      page: dto.page,
      limit: dto.limit,
      totalItems,
      totalPages,
      amountItemsCurrentPage: conversationItems.length,
      resource: conversationItems,
    });
  }

  private filterConversationsByAllowedTypes(
    conversations: ConversationModel[],
  ): ConversationModel[] {
    return conversations.filter((conversation) =>
      this.hasAllowedResourceType(conversation),
    );
  }

  private hasAllowedResourceType(conversation: ConversationModel): boolean {
    return conversation.messages.some(
      (message) =>
        message.paymentPlanPaidResourceType !== undefined &&
        this.allowedConversationTypes.includes(
          message.paymentPlanPaidResourceType,
        ),
    );
  }
}
