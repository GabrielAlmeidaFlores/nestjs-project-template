import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CancelPaymentPlanResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => OrganizationPaymentPlanId, {
    isArray: true,
  })
  public organizationPaymentPlanId: OrganizationPaymentPlanId[];

  protected override readonly _type = CancelPaymentPlanResponseDto.name;
}
