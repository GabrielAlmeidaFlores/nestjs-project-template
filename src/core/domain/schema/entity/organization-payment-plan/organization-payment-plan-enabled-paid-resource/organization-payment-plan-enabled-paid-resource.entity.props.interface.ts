import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/organization-payment-plan/organization-payment-plan/organization-payment-plan.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export interface OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: RelationType<ApplicationPaidResourceEntity>;
  organizationPaymentPlan: OrganizationPaymentPlanEntity;
}
