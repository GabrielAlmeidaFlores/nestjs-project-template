import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/payment-plan/application-paid-resource/application-paid-resource.entity';
import type { OrganizationPaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/organization-payment-plan/organization-payment-plan.entity';

export interface OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: ApplicationPaidResourceEntity;
  organizationPaymentPlan: OrganizationPaymentPlanEntity;
}
