import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { ConversationEventPayloadType } from '@module/ai/chat/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import type { ConversationEventTypeEnum } from '@module/ai/chat/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import type { ConversationEventId } from '@module/ai/chat/domain/schema/entity/conversation-event/value-object/conversation-event-id/conversation-event-id.value-object';

@ResponseDto()
export class GetConversationEventResponseDto extends BaseBuildableDtoObject {
  public id: ConversationEventId | null;
  public type: ConversationEventTypeEnum | null;
  public name: string | null;
  public payload: ConversationEventPayloadType | null;

  protected override readonly _type = GetConversationEventResponseDto.name;
}
