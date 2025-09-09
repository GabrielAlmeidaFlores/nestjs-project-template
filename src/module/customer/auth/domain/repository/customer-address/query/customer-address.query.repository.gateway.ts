import type { GetCustomerAddressQueryResult } from '@module/customer/auth/domain/repository/customer-address/query/result/get-customer-address.query.result';
import type { CustomerAddressId } from '@module/customer/auth/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

export abstract class CustomerAddressQueryRepositoryGateway {
  public abstract findCustomerAddressById(
    id: CustomerAddressId,
  ): Promise<GetCustomerAddressQueryResult | null>;
}
