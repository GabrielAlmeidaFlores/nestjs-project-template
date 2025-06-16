import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanEnabledPaidResourceEntity {
  public readonly applicationPaidResource: Guid;
  public readonly organizationPaymentPlan: OrganizationPaymentPlanEntity;

  protected readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceEntity.name;

  public constructor(
    props: OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface,
  ) {
    this.applicationPaidResource = props.applicationPaidResource;
    this.organizationPaymentPlan = props.organizationPaymentPlan;
  }
}
