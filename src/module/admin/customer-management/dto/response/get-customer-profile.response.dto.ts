import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CustomerAddressResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public recipient: string;

  @ResponseDtoStringProperty()
  public street: string;

  @ResponseDtoStringProperty()
  public number: string;

  @ResponseDtoStringProperty()
  public neighborhood: string;

  @ResponseDtoStringProperty()
  public city: string;

  @ResponseDtoStringProperty()
  public state: string;

  @ResponseDtoStringProperty()
  public postalCode: string;

  protected override readonly _type = CustomerAddressResponseDto.name;
}

@ResponseDto()
export class GetCustomerProfileResponseDto extends BaseBuildableDtoObject {
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

  @ResponseDtoEnumProperty(CustomerTypeEnum)
  public customerType: CustomerTypeEnum;

  @ResponseDtoDateProperty()
  public registrationDate: Date;

  @ResponseDtoStringProperty()
  public paymentPlanName: string;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public paymentPlanPrice: DecimalValue;

  @ResponseDtoEnumProperty(PaymentPlanCycleEnum)
  public paymentPlanCycle: PaymentPlanCycleEnum;

  @ResponseDtoBooleanProperty()
  public customerIsActive: boolean;

  @ResponseDtoObjectProperty(() => CustomerAddressResponseDto, {
    required: false,
  })
  public address?: CustomerAddressResponseDto;

  protected override readonly _type = GetCustomerProfileResponseDto.name;
}
