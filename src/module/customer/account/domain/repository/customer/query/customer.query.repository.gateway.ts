import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findOneCustomerById(
    id: CustomerId,
  ): Promise<GetCustomerQueryResult | null>;
}
