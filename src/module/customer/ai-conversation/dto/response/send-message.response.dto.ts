import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class MessageItemDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  @ResponseDtoEnumProperty(MessageRoleEnum)
  public role: MessageRoleEnum;

  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoDateProperty()
  public timestamp: Date;

  protected override readonly _type = MessageItemDto.name;
}

@ResponseDto()
export class SendMessageResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => MessageItemDto)
  public userMessage: MessageItemDto;

  @ResponseDtoObjectProperty(() => MessageItemDto)
  public assistantMessage: MessageItemDto;

  protected override readonly _type = SendMessageResponseDto.name;
}
