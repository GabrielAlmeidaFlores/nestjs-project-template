import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationPaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/value-object/organization-payment-plan-enable-paid-resource-id/organization-payment-plan-enable-paid-resource-id.value.object';
import type { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import type { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

export interface OrganizationPaymentPlanEnablePaidResourceEntityPropsInterface extends BaseEntityPropsInterface<OrganizationPaymentPlanEnablePaidResourceId> {
  paymentPlan?: PaymentPlanEntity | null;
  paymentPlanPaidResource?: PaymentPlanPaidResourceEntity | null;
}
