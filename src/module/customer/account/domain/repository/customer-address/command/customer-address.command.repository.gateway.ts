import type { TransactionType } from '@core/domain/repository/base/command/type/transaction.type';
import type { CustomerAddressEntity } from '@module/customer/account/domain/schema/entity/customer-address/customer-address.entity';

export abstract class CustomerAddressCommandRepositoryGateway {
  public abstract createCustomerAddress(
    props: CustomerAddressEntity,
  ): TransactionType;
}
