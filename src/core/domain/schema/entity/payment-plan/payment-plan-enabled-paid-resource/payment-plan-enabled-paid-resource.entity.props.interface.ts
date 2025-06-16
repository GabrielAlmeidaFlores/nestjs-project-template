import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity';

export interface PaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: ApplicationPaidResourceEntity;
  paymentPlan: PaymentPlanEntity;
}
