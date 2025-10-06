import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CustomerAddressSignUpRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public city: string;

  @RequestDtoStringProperty()
  public neighborhood: string;

  @RequestDtoEnumProperty(StateCodeEnum)
  public stateCode: StateCodeEnum;

  @RequestDtoValueObjectProperty(PostalCode)
  public postalCode: PostalCode;

  @RequestDtoNumberProperty()
  public addressNumber: number;

  protected override readonly _type = CustomerAddressSignUpRequestDto.name;
}

@RequestDto()
export class CustomerSignUpRequestDto extends BaseBuildableDtoObject {
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

  @RequestDtoObjectProperty(() => CustomerAddressSignUpRequestDto)
  public customerAddress: CustomerAddressSignUpRequestDto;

  protected override readonly _type = CustomerSignUpRequestDto.name;
}
