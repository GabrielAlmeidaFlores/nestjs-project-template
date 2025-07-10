import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';
import type { CustomerAddressEntity } from '@core/domain/schema/entity/customer/customer-address/customer-address.entity';

export abstract class CustomerAddressCommandRepositoryGateway {
  public abstract createCustomerAddress(
    props: CustomerAddressEntity,
  ): TransactionEventType;
}
