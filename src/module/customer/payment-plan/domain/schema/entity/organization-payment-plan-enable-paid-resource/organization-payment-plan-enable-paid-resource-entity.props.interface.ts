import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationPaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/value-object/organization-payment-plan-enable-paid-resource-id/organization-payment-plan-enable-paid-resource-id.value-object';
import type { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import type { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

export interface OrganizationPaymentPlanEnablePaidResourceEntityPropsInterface
  extends BaseEntityPropsInterface<OrganizationPaymentPlanEnablePaidResourceId> {
  paymentPlan: PaymentPlanId;
  paymentPlanPaidResource: PaymentPlanPaidResourceId;
}
