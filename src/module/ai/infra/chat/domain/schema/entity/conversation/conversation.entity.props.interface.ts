import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ConversationStatusTypeEnum } from '@module/ai/infra/chat/domain/schema/entity/conversation/enum/conversation-status-type-enum';
import type { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { ConversationEventEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-event/conversation-event.entity';
import type { ConversationMessageEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-message/conversation-message.entity';
import type { ConversationToolPolicyEntity } from '@module/ai/infra/chat/domain/schema/entity/conversation-tool-policy/conversation-tool-policy.entity';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export interface ConversationEntityPropsInterface
  extends BaseEntityPropsInterface<ConversationId> {
  customerId?: CustomerId | null;
  assistantType?: string | null;
  status?: ConversationStatusTypeEnum | null;
  createdAt: Date;
  lastAIMessageAt?: Date | null;
  archivedAt?: Date | null;
  conversationMessage?: ConversationMessageEntity[] | null;
  conversationEvent?: ConversationEventEntity[] | null;
  conversationToolPolicy?: ConversationToolPolicyEntity | null;
}
