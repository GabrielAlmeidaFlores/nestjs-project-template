import { ConversationEventPayloadType } from '@module/ai/domain/schema/entity/conversation-event/conversation-event.entity.props.interface';
import { ConversationEventTypeEnum } from '@module/ai/domain/schema/entity/conversation-event/enum/conversation-event-type.enum';
import { ConversationEventId } from '@module/ai/domain/schema/entity/conversation-event/value-object/conversation-event-id/conversation-event-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetConversationEventResponseDto extends BaseBuildableDtoObject {
  public id: ConversationEventId | null;
  public type: ConversationEventTypeEnum | null;
  public name: string | null;
  public payload: ConversationEventPayloadType | null;

  protected override readonly _type = GetConversationEventResponseDto.name;
}
