import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class PreAuthIdentitySignInRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @RequestDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @RequestDtoEnumProperty(SignInMFAOptionEnum)
  public mfaOption: SignInMFAOptionEnum;

  @RequestDtoStringProperty()
  public password: string;

  @RequestDtoBooleanProperty({ required: false, example: false })
  public forceNewSession?: boolean;

  protected override readonly _type = PreAuthIdentitySignInRequestDto.name;
}
