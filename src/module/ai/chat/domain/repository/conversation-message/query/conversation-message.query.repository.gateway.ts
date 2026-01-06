import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ChatMessageToConversationQueryParam } from '@module/ai/chat/domain/repository/conversation-message/query/param/chat-message-to-conversation.query.param';
import type { GetChatMessagesToConversationQueryResult } from '@module/ai/chat/domain/repository/conversation-message/query/result/get-chat-messages-to-conversation.query.result';

export abstract class ConversationMessageQueryRepositoryGateway {
  public abstract listByConversationIdAndCustomerId(
    listData: ChatMessageToConversationQueryParam,
  ): Promise<ListDataOutputModel<GetChatMessagesToConversationQueryResult>>;
}
