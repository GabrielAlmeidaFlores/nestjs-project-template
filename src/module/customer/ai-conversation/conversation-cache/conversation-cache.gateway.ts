import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { MessageHistoryItemModel } from '@module/customer/ai-conversation/conversation-cache/model/generic/message-history-item.model';
import type { ConversationModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/conversation.model';
import type { MessageModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/message.model';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class ConversationCacheGateway {
  public abstract createConversation(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    title: string,
  ): Promise<ConversationModel>;

  public abstract getConversation(
    conversationId: Guid,
  ): Promise<ConversationModel | null>;

  public abstract updateConversation(
    conversation: ConversationModel,
  ): Promise<void>;

  public abstract addMessage(message: MessageModel): Promise<void>;

  public abstract getMessages(
    conversationId: Guid,
    limit?: number,
  ): Promise<MessageModel[]>;

  public abstract getMessageHistory(
    conversationId: Guid,
    maxMessages?: number,
  ): Promise<MessageHistoryItemModel[]>;

  public abstract listConversationsByAuthIdentity(
    authIdentityId: AuthIdentityId,
    limit?: number,
    search?: string,
  ): Promise<ConversationModel[]>;
}
