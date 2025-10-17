import type { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

export abstract class CustomerTermsAcceptanceQueryRepositoryGateway {
  public abstract findOneByTermsIdAndCustomerId(
    termsId: CustomerTermsId,
    customerId: CustomerId,
  ): Promise<GetCustomerTermsAcceptanceQueryResult | null>;
}
