import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetCustomerAddressResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public city: string;

  @ResponseDtoStringProperty()
  public neighborhood: string;

  @ResponseDtoStringProperty()
  public street: string;

  @ResponseDtoEnumProperty(StateCodeEnum)
  public stateCode: StateCodeEnum;

  @ResponseDtoValueObjectProperty(PostalCode)
  public postalCode: PostalCode;

  @ResponseDtoNumberProperty()
  public addressNumber: number;

  protected override readonly _type = GetCustomerAddressResponseDto.name;
}
@ResponseDto()
export class GetCustomerDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(CustomerId)
  public customerId: CustomerId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoValueObjectProperty(Email)
  public email: Email;

  @ResponseDtoValueObjectProperty(FederalDocument)
  public federalDocument: FederalDocument;

  @ResponseDtoValueObjectProperty(PhoneNumber)
  public phoneNumber: PhoneNumber;

  @ResponseDtoStringProperty({ required: false })
  public profilePicture?: string;

  @ResponseDtoObjectProperty(() => GetCustomerAddressResponseDto)
  public customerAddress: GetCustomerAddressResponseDto;

  protected override readonly _type = GetCustomerDataResponseDto.name;
}

@ResponseDto()
export class GetOrganizationDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationId)
  public organizationId: OrganizationId;

  @ResponseDtoStringProperty()
  public organizationName: string;

  @ResponseDtoStringProperty({ required: false })
  public organizationLogo?: string;

  @ResponseDtoBooleanProperty()
  public organizationOwner: boolean;

  protected override readonly _type = GetOrganizationDataResponseDto.name;
}

@ResponseDto()
export class GetAuthenticatedCustomerDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => GetCustomerDataResponseDto)
  public customer: GetCustomerDataResponseDto;

  @ResponseDtoObjectProperty(() => GetOrganizationDataResponseDto)
  public organization: GetOrganizationDataResponseDto;

  protected override readonly _type =
    GetAuthenticatedCustomerDataResponseDto.name;
}
