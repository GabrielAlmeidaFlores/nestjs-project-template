import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ConversationEntity } from '@module/ai/domain/schema/entity/conversation/conversation.entity';
import type { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';

export abstract class ConversationCommandRepositoryGateway {
  public abstract createConversation(
    props: ConversationEntity,
  ): TransactionType;

  public abstract updateConversation(
    conversationId: ConversationId,
    props: ConversationEntity,
  ): TransactionType;

  public abstract updateLastAIMessageAt(
    id: ConversationId,
    lastAIMessageAt: Date,
  ): TransactionType;

  public abstract softArchive(
    id: ConversationId,
    archivedAt: Date,
  ): TransactionType;
}
