import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import type { ConversationMessageRoleTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-message/enum/conversation-message-role-type.enum';
import type { ConversationMessageId } from '@module/ai/chat/domain/schema/entity/conversation-message/value-object/conversation-message-id/conversation-message-id.value-object';

export interface ConversationMessageEntityInterface
  extends BaseEntityPropsInterface<ConversationMessageId> {
  conversation?: ConversationEntity | null;
  role?: ConversationMessageRoleTypeEnum | null;
  content?: string | null;
  createdAt: Date;
}
