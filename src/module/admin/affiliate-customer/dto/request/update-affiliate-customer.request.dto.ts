import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateAffiliateCustomerRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty({ required: false })
  public paymentCommissionPercentage?: number;

  @RequestDtoNumberProperty({ required: false })
  public paymentPlanDiscountPercentage?: number;

  @RequestDtoDateProperty({ required: false })
  public paymentPlanDiscountValidUntil?: Date;

  @RequestDtoNumberProperty({ required: false })
  public paymentPlanDiscountRedemptionLimit?: number;

  @RequestDtoValueObjectProperty(PaymentPlanId, {
    isArray: true,
    required: false,
  })
  public paymentPlanIds?: PaymentPlanId[];

  protected override readonly _type = UpdateAffiliateCustomerRequestDto.name;
}
