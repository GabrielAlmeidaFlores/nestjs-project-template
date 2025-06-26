import type { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export abstract class CustomerAddressQueryRepositoryGateway {
  public abstract findCustomerAddressByCustomerId(
    customerId: Guid,
  ): Promise<CustomerAddressEntity | null>;
}
