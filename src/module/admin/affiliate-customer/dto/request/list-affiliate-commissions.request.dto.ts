import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-date-property/request-dto-date-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class ListAffiliateCommissionsRequestDto extends BaseBuildableDtoObject {
  @RequestDtoDateProperty({ required: false })
  public from?: Date;

  @RequestDtoDateProperty({ required: false })
  public to?: Date;

  @RequestDtoValueObjectProperty(OrganizationPaymentPlanId, { required: false })
  public plan?: OrganizationPaymentPlanId;

  @RequestDtoStringProperty({ required: false })
  public searchBy?: string;

  protected override readonly _type = ListAffiliateCommissionsRequestDto.name;
}
