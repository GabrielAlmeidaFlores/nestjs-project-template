import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { GetOrganizationPaymentPlanAffiliateCommissionQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/result/get-organization-payment-plan-affiliate-commission.query.result';
import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

export abstract class OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway {
  public abstract findOneByOrganizationPaymentPlanId(
    id: OrganizationPaymentPlanId,
  ): Promise<GetOrganizationPaymentPlanAffiliateCommissionQueryResult | null>;

  public abstract findManyByAffiliateCustomerId(
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetOrganizationPaymentPlanAffiliateCommissionQueryResult[]>;
}
