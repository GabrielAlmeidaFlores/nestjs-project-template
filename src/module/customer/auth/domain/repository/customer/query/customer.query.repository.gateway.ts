import type { GetCustomerQueryResult } from '@module/customer/auth/domain/repository/customer/query/result/get-customer.query.result';
import type { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findCustomerById(
    id: CustomerId,
  ): Promise<GetCustomerQueryResult | null>;
}
