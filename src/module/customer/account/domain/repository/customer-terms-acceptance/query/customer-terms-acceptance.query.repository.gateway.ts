import type { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import type { TermsId } from '@module/customer/account/domain/schema/entity/terms/value-object/terms-id/terms-id.value-object';

export abstract class CustomerTermsAcceptanceQueryRepositoryGateway {
  public abstract findOneByTermsIdAndCustomerId(
    termsId: TermsId,
    customerId: CustomerId,
  ): Promise<GetCustomerTermsAcceptanceQueryResult | null>;
}
