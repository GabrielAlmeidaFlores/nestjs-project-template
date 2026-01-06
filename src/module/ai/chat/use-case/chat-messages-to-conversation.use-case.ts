import { Inject, Injectable } from '@nestjs/common';

import { ConversationMessageQueryRepositoryGateway } from '@module/ai/chat/domain/repository/conversation-message/query/conversation-message.query.repository.gateway';
import { ChatMessageToConversationQueryParam } from '@module/ai/chat/domain/repository/conversation-message/query/param/chat-message-to-conversation.query.param';
import { ChatMessagesToConversationRequestDto } from '@module/ai/chat/dto/request/chat-messages-to-conversation.request.dto';
import { GetConversationMessageResponseDto } from '@module/ai/chat/dto/response/get-conversation-message.response.dto';
import { ListConversationMessageResponseDto } from '@module/ai/chat/dto/response/list-conversation-message.response.dto';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ChatMessagesToConversationUseCase {
  protected readonly _type = ChatMessagesToConversationUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,

    @Inject(ConversationMessageQueryRepositoryGateway)
    private readonly conversationMessageQueryRepositoryGateway: ConversationMessageQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: ChatMessagesToConversationRequestDto,
  ): Promise<ListConversationMessageResponseDto> {
    const customer =
      await this.customerQueryRepositoryGateway.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const params = new ChatMessageToConversationQueryParam({
      ...dto,
      conversationId: dto.conversationId,
      customerId: customer.id,
    });

    const messages =
      await this.conversationMessageQueryRepositoryGateway.listByConversationIdAndCustomerId(
        params,
      );

    const resource = messages.resource.map((m) =>
      GetConversationMessageResponseDto.build({
        role: m.role ?? null,
        content: m.content ?? null,
      }),
    );

    return ListConversationMessageResponseDto.build({
      ...messages,
      resource,
    });
  }
}
