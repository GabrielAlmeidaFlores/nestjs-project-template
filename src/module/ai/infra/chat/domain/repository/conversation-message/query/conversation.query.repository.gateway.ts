import type { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { ListConversationMessageResponseDto } from '@module/ai/infra/chat/dto/response/list-conversation-message.response.dto';

export abstract class ConversationMessageQueryRepositoryGateway {
  public abstract listByConversationId(
    conversationId: ConversationId,
  ): Promise<ListConversationMessageResponseDto>;
}
