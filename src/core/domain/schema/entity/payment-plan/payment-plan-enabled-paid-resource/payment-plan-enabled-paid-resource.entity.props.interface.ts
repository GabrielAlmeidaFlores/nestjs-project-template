import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity';
import type { RelationType } from '@core/domain/schema/type/relation.type';

export interface PaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: RelationType<ApplicationPaidResourceEntity>;
  paymentPlan: PaymentPlanEntity;
}
