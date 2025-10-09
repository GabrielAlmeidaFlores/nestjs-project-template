import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AuthIdentityForgotPasswordRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Email)
  public email: Email;

  protected override readonly _type = AuthIdentityForgotPasswordRequestDto.name;
}
