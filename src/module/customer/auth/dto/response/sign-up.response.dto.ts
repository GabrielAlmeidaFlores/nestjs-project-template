import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ResponseDto } from '@shared/api/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class SignUpResponseDto extends BaseBuildableObject {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  protected override readonly _type = SignUpResponseDto.name;
}
