import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-paid-resource/application-paid-resource/application-paid-resource.entity';
import type { PaymentPlanEntity } from '@core/domain/schema/entity/payment-plan/payment-plan/payment-plan.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface PaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  paymentPlan: PaymentPlanEntity;
}
