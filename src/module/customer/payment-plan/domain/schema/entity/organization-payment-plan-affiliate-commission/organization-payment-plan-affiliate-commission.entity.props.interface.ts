import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';

export interface OrganizationPaymentPlanAffiliateCommissionEntityPropsInterface extends BaseEntityPropsInterface<OrganizationPaymentPlanAffiliateCommissionId> {
  organizationPaymentPlan: OrganizationPaymentPlanId;
  affiliateCustomer: AffiliateCustomerId;
  commissionPercentage: number;
}
