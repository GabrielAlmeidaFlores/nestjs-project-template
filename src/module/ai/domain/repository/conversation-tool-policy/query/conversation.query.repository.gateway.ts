import type { GetConversationToolPolicyQueryResult } from '@module/ai/domain/repository/conversation-tool-policy/query/result/get-conversation-tool-policy.query.result';
import type { ConversationId } from '@module/ai/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { ConversationToolPolicyId } from '@module/ai/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';

export abstract class ConversationToolPolicyQueryRepositoryGateway {
  public abstract findById(
    id: ConversationToolPolicyId,
  ): Promise<GetConversationToolPolicyQueryResult>;

  public abstract getByConversationId(
    conversationId: ConversationId,
  ): Promise<GetConversationToolPolicyQueryResult>;
}
