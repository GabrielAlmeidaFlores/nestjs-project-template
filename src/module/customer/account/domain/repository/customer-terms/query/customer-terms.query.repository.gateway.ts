import type { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';

export abstract class CustomerTermsQueryRepositoryGateway {
  public abstract findOneByStatus(
    isActive: boolean,
  ): Promise<GetCustomerTermsQueryResult | null>;
}
