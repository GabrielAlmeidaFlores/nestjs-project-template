import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { ResponseDto } from '@shared/api/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/decorator/property/dto-property/response/response-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@ResponseDto()
export class LoginResponseDto extends BaseBuildableObject {
  @ResponseDtoValueObjectProperty(Email)
  public email: Email;

  protected override readonly _type = LoginResponseDto.name;
}
