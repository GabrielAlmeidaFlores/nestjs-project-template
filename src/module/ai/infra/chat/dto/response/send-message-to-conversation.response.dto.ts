import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AiConversationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public type: string;

  @ResponseDtoStringProperty()
  public text: string;

  protected override readonly _type = AiConversationResponseDto.name;
}

@ResponseDto()
export class SendMessageToConversationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => AiConversationResponseDto, {
    isArray: true,
  })
  public content: AiConversationResponseDto[];
  protected override readonly _type = SendMessageToConversationResponseDto.name;
}
