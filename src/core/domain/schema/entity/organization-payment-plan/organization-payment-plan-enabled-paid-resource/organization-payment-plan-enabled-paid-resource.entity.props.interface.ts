import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  organizationPaymentPlan: OrganizationPaymentPlanEntity;
}
