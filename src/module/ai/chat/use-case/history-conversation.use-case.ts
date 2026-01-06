import { Inject, Injectable } from '@nestjs/common';

import { ConversationQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation/query/conversation.query.repository.gateway';
import { ConversationQueryParam } from '@module/ai/chat/domain/repository/conversation/query/param/conversation.query.param';
import { HistoryConversationRequestDto } from '@module/ai/chat/dto/request/history-conversation.request.dto';
import { GetConversationResponseDto } from '@module/ai/chat/dto/response/get-conversation.response.dto';
import { ListConversationResponseDto } from '@module/ai/chat/dto/response/list-conversation-response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class HistoryConversationUseCase {
  protected readonly _type = HistoryConversationUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    @Inject(ConversationQueryRepositoryGateway)
    private readonly conversationQueryRepositoryGateway: ConversationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: HistoryConversationRequestDto,
  ): Promise<ListConversationResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const params = new ConversationQueryParam({
      ...dto,
      customerId: customer.id,
    });

    const conversation =
      await this.conversationQueryRepositoryGateway.listConversationById(
        params,
      );
    const resource = conversation.resource.map((item) =>
      GetConversationResponseDto.build({
        ...item,
        assistantType: item.assistantType ?? null,
        title: item.title ?? null,
        status: item.status ?? null,
        lastAIMessageAt: item.lastAIMessageAt ?? null,
        archivedAt: item.archivedAt ?? null,
        createdAt: item.createdAt,
      }),
    );

    return ListConversationResponseDto.build({
      ...conversation,
      resource,
    });
  }
}
