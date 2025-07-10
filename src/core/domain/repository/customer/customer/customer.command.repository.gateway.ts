import type { TransactionEventType } from '@core/domain/repository/base/type/transaction-event.interface';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';

export abstract class CustomerCommandRepositoryGateway {
  public abstract createCustomer(props: CustomerEntity): TransactionEventType;
}
