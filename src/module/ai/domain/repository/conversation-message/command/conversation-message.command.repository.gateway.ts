import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { ConversationMessageEntity } from '@module/ai/domain/schema/entity/conversation-message/conversation-message.entity';

export abstract class ConversationMessageCommandRepositoryGateway {
  public abstract createConversationMessage(
    props: ConversationMessageEntity,
  ): TransactionType;

  public abstract updateConversationMessage(
    id: ConversationId,
    props: ConversationMessageEntity,
  ): TransactionType;
}
