import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan.entity';
import type { PaymentPlanPaidResourceEntity } from '@core/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

export interface PaymentPlanEnabledPaidResourceEntityPropsInterface {
  paymentPlanPaidResource: PaymentPlanPaidResourceEntity;
  paymentPlan: PaymentPlanEntity;
}
