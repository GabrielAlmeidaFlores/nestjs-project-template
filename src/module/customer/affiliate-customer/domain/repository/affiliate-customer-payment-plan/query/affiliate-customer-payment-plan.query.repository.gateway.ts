import type { GetAffiliateCustomerPaymentPlanQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/result/get-affiliate-customer-payment-plan.query.result';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

export abstract class AffiliateCustomerPaymentPlanQueryRepositoryGateway {
  public abstract findManyByAffiliateCustomerId(
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerPaymentPlanQueryResult[]>;
}
