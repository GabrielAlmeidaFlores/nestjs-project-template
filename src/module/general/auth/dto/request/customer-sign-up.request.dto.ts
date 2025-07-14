import { StateCodeEnum } from '@core/domain/schema/entity/customer/enum/state-code.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property.decorator';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

@RequestDto()
export class CustomerSignUpDataRequestDto extends BaseBuildableObject {
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

  protected override readonly _type = CustomerSignUpDataRequestDto.name;
}

@RequestDto()
export class CustomerSignUpDataAddressRequestDto extends BaseBuildableObject {
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

  protected override readonly _type = CustomerSignUpDataAddressRequestDto.name;
}

@RequestDto()
export class CustomerSignUpRequestDto extends BaseBuildableObject {
  @RequestDtoObjectProperty(() => CustomerSignUpDataRequestDto)
  public customer: CustomerSignUpDataRequestDto;

  @RequestDtoObjectProperty(() => CustomerSignUpDataAddressRequestDto)
  public customerAddress: CustomerSignUpDataAddressRequestDto;

  protected override readonly _type = CustomerSignUpRequestDto.name;
}
