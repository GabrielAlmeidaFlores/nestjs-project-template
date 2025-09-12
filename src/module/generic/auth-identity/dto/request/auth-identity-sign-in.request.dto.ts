import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { SignInMFAOptionEnum } from '@module/generic/auth-identity/enum/sign-in-mfa-option.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class AuthIdentitySignInRequestDto extends BaseBuildableObject {
  @RequestDtoValueObjectProperty(Email, { required: false })
  public email?: Email;

  @RequestDtoValueObjectProperty(FederalDocument, { required: false })
  public federalDocument?: FederalDocument;

  @RequestDtoEnumProperty(SignInMFAOptionEnum)
  public mfaOption: SignInMFAOptionEnum;

  @RequestDtoStringProperty()
  public mfaCode: string;

  @RequestDtoStringProperty()
  public password: string;

  protected override readonly _type = AuthIdentitySignInRequestDto.name;
}
