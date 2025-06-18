import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationPaymentPlanEnabledPaidResourceEntity {
  public readonly applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
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
