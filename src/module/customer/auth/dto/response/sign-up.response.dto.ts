import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { ResponseDto } from '@shared/api/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-value-object-property.decorator';
import { PublicPropertyType } from '@shared/system/type/public-property.type';

@ResponseDto()
export class SignUpResponseDto {
  @ResponseDtoValueObjectProperty(Guid)
  public id: Guid;

  protected readonly _type = SignUpResponseDto.name;

  public constructor(props: PublicPropertyType<SignUpResponseDto>) {
    this.id = props.id;
  }
}
