import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreateAffiliateCustomerRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(CustomerId)
  public customerId: CustomerId;

  @RequestDtoNumberProperty()
  public paymentCommissionPercentage: number;

  @RequestDtoNumberProperty()
  public paymentPlanDiscountPercentage: number;

  @RequestDtoDateProperty()
  public paymentPlanDiscountValidUntil: Date;

  @RequestDtoNumberProperty()
  public paymentPlanDiscountRedemptionLimit: number;

  @RequestDtoValueObjectProperty(PaymentPlanId, {
    isArray: true,
    required: false,
  })
  public paymentPlanIds?: PaymentPlanId[];

  protected override readonly _type = CreateAffiliateCustomerRequestDto.name;
}
