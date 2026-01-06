import { ChatPersonaTypeEnum } from '@module/ai/domain/schema/entity/conversation-tool-policy/enum/chat-persona-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class StartChatRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public readonly assistantType?: ChatPersonaTypeEnum;

  protected override readonly _type = StartChatRequestDto.name;
}
