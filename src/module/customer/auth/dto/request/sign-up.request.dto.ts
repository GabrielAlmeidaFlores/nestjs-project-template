import { StateCodeEnum } from '@core/domain/schema/entity/customer/enum/state-code.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RequestDto } from '@shared/api/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/decorator/property/dto-property/request/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/decorator/property/dto-property/request/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/decorator/property/dto-property/request/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/decorator/property/dto-property/request/request-dto-value-object-property.decorator';

@RequestDto()
export class SignUpRequestDto {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoValueObjectProperty(Email)
  public email: Email;

  @RequestDtoValueObjectProperty(PhoneNumber)
  public phoneNumber: PhoneNumber;

  @RequestDtoValueObjectProperty(FederalDocument)
  public federalDocument: FederalDocument;

  @RequestDtoStringProperty()
  public password: string;

  @RequestDtoStringProperty()
  public city: string;

  @RequestDtoStringProperty()
  public neighborhood: string;

  @RequestDtoEnumProperty(StateCodeEnum)
  public countryState: StateCodeEnum;

  @RequestDtoValueObjectProperty(PostalCode)
  public postalCode: PostalCode;

  @RequestDtoNumberProperty()
  public addressNumber: number;

  protected readonly _type = SignUpRequestDto.name;
}
