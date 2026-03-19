import type { GetAffiliateCustomerQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/result/get-affiliate-customer.query.result';
import type { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export abstract class AffiliateCustomerQueryRepositoryGateway {
  public abstract findOneById(
    id: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerQueryResult | null>;

  public abstract findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetAffiliateCustomerQueryResult | null>;

  public abstract listAll(): Promise<GetAffiliateCustomerQueryResult[]>;
}
