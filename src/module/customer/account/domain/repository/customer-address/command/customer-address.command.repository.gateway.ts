import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';
import type { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';

export abstract class CustomerAddressCommandRepositoryGateway {
  public abstract createCustomerAddress(
    props: CustomerAddressEntity,
  ): TransactionType;

  public abstract updateCustomerAddress(
    customerAddressId: CustomerAddressId,
    props: CustomerAddressEntity,
  ): TransactionType;
}
