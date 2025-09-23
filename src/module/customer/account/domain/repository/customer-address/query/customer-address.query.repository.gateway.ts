import type { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import type { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

export abstract class CustomerAddressQueryRepositoryGateway {
  public abstract findOneByCustomerAddressId(
    customerAddressId: CustomerAddressId,
  ): Promise<GetCustomerAddressQueryResult | null>;
}
