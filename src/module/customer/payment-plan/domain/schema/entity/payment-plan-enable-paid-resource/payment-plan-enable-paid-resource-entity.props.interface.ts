import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import type { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value-object';
import type { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

export interface PaymentPlanEnablePaidResourceEntityPropsInterface
  extends BaseEntityPropsInterface<PaymentPlanEnablePaidResourceId> {
  paymentPlan?: PaymentPlanEntity | null;
  paymentPlanPaidResource?: PaymentPlanPaidResourceEntity | null;
}
