import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { OrganizationPaymentPlanEnabledApplicationPaidResourceEntityPropsInterface } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan-enabled-application-paid-resource/organization-payment-plan-enabled-application-paid-resource.entity.props.interface';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export class OrganizationPaymentPlanEnabledApplicationPaidResourceEntity {
  public readonly applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  public readonly organizationPaymentPlan: OrganizationPaymentPlanEntity;

  protected readonly _type =
    OrganizationPaymentPlanEnabledApplicationPaidResourceEntity.name;

  public constructor(
    props: OrganizationPaymentPlanEnabledApplicationPaidResourceEntityPropsInterface,
  ) {
    this.applicationPaidResource = props.applicationPaidResource;
    this.organizationPaymentPlan = props.organizationPaymentPlan;
  }
}
