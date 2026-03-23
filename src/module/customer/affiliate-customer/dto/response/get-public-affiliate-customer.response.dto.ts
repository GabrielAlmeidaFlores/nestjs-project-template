import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPublicAffiliateCustomerResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AffiliateCustomerId)
  public id: AffiliateCustomerId;

  @ResponseDtoNumberProperty()
  public paymentPlanDiscountPercentage: number;

  @ResponseDtoDateProperty()
  public paymentPlanDiscountValidUntil: Date;

  @ResponseDtoNumberProperty()
  public paymentPlanDiscountRedemptionLimit: number;

  @ResponseDtoValueObjectProperty(PaymentPlanId, { isArray: true })
  public paymentPlanIds: PaymentPlanId[];

  protected override readonly _type =
    GetPublicAffiliateCustomerResponseDto.name;
}
