import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import type { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';

export abstract class ConversationMessageCommandRepositoryGateway {
  public abstract createConversationMessage(
    props: ConversationMessageEntity,
  ): TransactionType;

  public abstract updateConversationMessage(
    id: ConversationId,
    props: ConversationMessageEntity,
  ): TransactionType;
}
