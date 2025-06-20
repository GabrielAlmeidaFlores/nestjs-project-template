import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/payment-plan/application-paid-resource/application-paid-resource.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/payment-plan/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity.props.interface';

export class OrganizationPaymentPlanEnabledPaidResourceEntity {
  public readonly applicationPaidResource: ApplicationPaidResourceEntity;
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
