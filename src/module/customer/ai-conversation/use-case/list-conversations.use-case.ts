import { Inject, Injectable } from '@nestjs/common';

import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import {
  ConversationItemDto,
  ListConversationsResponseDto,
} from '@module/customer/ai-conversation/dto/response/list-conversations.response.dto';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListConversationsUseCase {
  protected readonly _type = ListConversationsUseCase.name;

  public constructor(
    @Inject(ConversationCacheGateway)
    private readonly conversationCacheGateway: ConversationCacheGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: ListDataRequestDto,
  ): Promise<ListConversationsResponseDto> {
    const conversations =
      await this.conversationCacheGateway.listConversationsByAuthIdentity(
        sessionData.authIdentityId,
      );

    const startIndex = (dto.page - 1) * dto.limit;
    const endIndex = startIndex + dto.limit;
    const paginatedConversations = conversations.slice(startIndex, endIndex);

    const conversationItems = paginatedConversations.map((conversation) =>
      ConversationItemDto.build({
        id: conversation.id,
        title: conversation.title,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      }),
    );

    const totalItems = conversations.length;
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
}
