import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import type { ConversationEventTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import type { ConversationEventId } from '@module/ai/chat/domain/schema/entity/conversation-event/value-object/conversation-event-id/conversation-event-id.value-object';
import type { AiToolCallType } from '@module/ai/gemini/types/tool-call.interface';

export interface ConversationToolCallPayloadInterface {
  tool: AiToolCallType['tool'];
  arguments: AiToolCallType['arguments'];
}

export interface ConversationToolResultPayloadInterface {
  tool: AiToolCallType['tool'];
  resultJson: string;
}

export type ConversationEventPayloadType =
  | ConversationToolCallPayloadInterface
  | ConversationToolResultPayloadInterface;

export interface ConversationEventEntityPropsInterface
  extends BaseEntityPropsInterface<ConversationEventId> {
  conversation?: ConversationEntity | null;
  type?: ConversationEventTypeEnum | null;
  name?: string | null;
  payload?: ConversationEventPayloadType | null;
  createdAt: Date;
}
