import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { ConversationToolPolicyEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import type { ConversationToolPolicyId } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';

export abstract class ConversationToolPolicyCommandRepositoryGateway {
  public abstract createConversationToolPolicy(
    entity: ConversationToolPolicyEntity,
  ): TransactionType;

  public abstract updateConversationToolPolicy(
    id: ConversationToolPolicyId,
    entity: ConversationToolPolicyEntity,
  ): TransactionType;
}
