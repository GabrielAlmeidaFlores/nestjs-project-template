import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/payment-plan/application-paid-resource/application-paid-resource.entity';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/available-payment-plan/available-payment-plan.entity';

export interface AvailablePaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: ApplicationPaidResourceEntity;
  availablePaymentPlan: AvailablePaymentPlanEntity;
}
