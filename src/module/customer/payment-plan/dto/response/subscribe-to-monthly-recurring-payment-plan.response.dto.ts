import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SubscribeToMonthlyRecurringPaymentPlanResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationPaymentPlanId)
  public organizationPaymentPlanId: OrganizationPaymentPlanId;

  protected override readonly _type =
    SubscribeToMonthlyRecurringPaymentPlanResponseDto.name;
}
