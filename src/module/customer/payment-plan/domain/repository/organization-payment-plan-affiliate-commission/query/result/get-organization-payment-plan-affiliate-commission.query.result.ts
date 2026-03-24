import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import type { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';

export class GetOrganizationPaymentPlanAffiliateCommissionQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationPaymentPlanAffiliateCommissionId;
  public readonly organizationPaymentPlan: OrganizationPaymentPlanId;
  public readonly affiliateCustomer: AffiliateCustomerId;
  public readonly commissionPercentage: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetOrganizationPaymentPlanAffiliateCommissionQueryResult.name;
}
