import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ConversationEventEntity } from '@module/ai/domain/schema/entity/conversation-event/conversation-event.entity';

export abstract class ConversationEventCommandRepositoryGateway {
  public abstract createConversationEvent(
    props: ConversationEventEntity,
  ): TransactionType;
}
