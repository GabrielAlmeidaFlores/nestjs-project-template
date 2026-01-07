import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateConversationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(Guid)
  public conversationId: Guid;

  @ResponseDtoStringProperty()
  public title: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  protected override readonly _type = CreateConversationResponseDto.name;
}
