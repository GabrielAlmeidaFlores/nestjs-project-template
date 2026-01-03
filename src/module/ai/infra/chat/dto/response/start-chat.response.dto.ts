import { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class StartChatResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(ConversationId)
  public conversationId: ConversationId;

  protected override readonly _type = StartChatResponseDto.name;
}
