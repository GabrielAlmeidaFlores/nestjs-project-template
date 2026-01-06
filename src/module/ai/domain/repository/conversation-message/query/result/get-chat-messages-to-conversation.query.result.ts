import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetConversationQueryResult } from '@module/ai/domain/repository/conversation/query/result/get-conversation.query.result';
import type { ConversationMessageRoleTypeEnum } from '@module/ai/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import type { ConversationMessageId } from '@module/ai/domain/schema/entity/conversation-message/value-object/conversation-message-id/conversation-message-id.value-object';

export class GetChatMessagesToConversationQueryResult extends BaseBuildableObject {
  public readonly id: ConversationMessageId;
  public readonly conversation?: GetConversationQueryResult | null;
  public readonly role?: ConversationMessageRoleTypeEnum | null;
  public readonly content?: string | null;
  public readonly createdAt: Date;

  protected override readonly _type =
    GetChatMessagesToConversationQueryResult.name;
}
