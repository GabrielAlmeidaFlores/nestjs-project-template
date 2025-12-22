import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';

export abstract class ConversationMessageCommandRepositoryGateway {
  public abstract createConversationMessage(
    props: ConversationMessageEntity,
  ): TransactionType;
}
