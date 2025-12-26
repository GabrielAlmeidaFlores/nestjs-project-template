import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationPaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/value-object/organization-payment-plan-enabled-paid-resource-id/organization-payment-plan-enabled-paid-resource-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export interface OrganizationPaymentPlanEnabledPaidResourceEntityPropsInterface
  extends BaseEntityPropsInterface<OrganizationPaymentPlanEnabledPaidResourceId> {
  paymentPlan: PaymentPlanId;
  paymentPlanPaidResource: PaymentPlanPaidResourceId;
}
