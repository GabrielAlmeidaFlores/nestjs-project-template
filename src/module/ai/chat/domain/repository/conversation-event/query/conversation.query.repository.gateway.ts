import type { ConversationId } from '@module/ai/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { ListConversationEventResponseDto } from '@module/ai/chat/dto/response/list-conversation-event.response.dto';

export abstract class ConversationEventQueryRepositoryGateway {
  public abstract listByConversationId(
    conversationId: ConversationId,
  ): Promise<ListConversationEventResponseDto>;
}
