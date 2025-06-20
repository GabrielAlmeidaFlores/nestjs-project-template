import type { ApplicationPaidResourceEntity } from '@core/domain/schema/entity/application-resource/application-paid-resource/application-paid-resource.entity';
import type { AvailablePaymentPlanEntity } from '@core/domain/schema/entity/available-payment-plan/available-payment-plan/available-payment-plan.entity';
import type { RelationModel } from '@core/domain/schema/model/relation.model';

export interface AvailablePaymentPlanEnabledPaidResourceEntityPropsInterface {
  applicationPaidResource: RelationModel<ApplicationPaidResourceEntity>;
  availablePaymentPlan: AvailablePaymentPlanEntity;
}
