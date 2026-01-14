import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import type { PaymentPlanPaidResourceIaConfigId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource-ia-config/value-object/payment-plan-paid-resource-ia-config-id/payment-plan-paid-resource-ia-config-id.value-object';

export interface PaymentPlanPaidResourceIaConfigEntityPropsInterface extends BaseEntityPropsInterface<PaymentPlanPaidResourceIaConfigId> {
  prompt: string;

  paymentPlanPaidResource: PaymentPlanPaidResourceEntity;
}
