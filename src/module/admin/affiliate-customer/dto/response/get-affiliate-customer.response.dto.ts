import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetAffiliateCustomerResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AffiliateCustomerId)
  public id: AffiliateCustomerId;

  @ResponseDtoValueObjectProperty(CustomerId)
  public customerId: CustomerId;

  @ResponseDtoStringProperty({ required: false })
  public pixAddressKey?: string;

  @ResponseDtoEnumProperty(PixAddressKeyTypeEnum, { required: false })
  public pixAddressKeyType?: PixAddressKeyTypeEnum;

  @ResponseDtoNumberProperty()
  public paymentCommissionPercentage: number;

  @ResponseDtoNumberProperty()
  public paymentPlanDiscountPercentage: number;

  @ResponseDtoDateProperty()
  public paymentPlanDiscountValidUntil: Date;

  @ResponseDtoNumberProperty()
  public paymentPlanDiscountRedemptionLimit: number;

  @ResponseDtoBooleanProperty()
  public isActive: boolean;

  @ResponseDtoValueObjectProperty(PaymentPlanId, { isArray: true })
  public paymentPlanIds: PaymentPlanId[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetAffiliateCustomerResponseDto.name;
}
