import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';

export abstract class CustomerAddressQueryRepositoryGateway {
  public abstract findCustomerAddressById(
    id: Guid,
  ): Promise<GetCustomerAddressQueryResult | null>;
}
