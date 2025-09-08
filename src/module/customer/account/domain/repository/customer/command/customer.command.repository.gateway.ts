import type { TransactionType } from '@core/domain/repository/base/command/type/transaction.type';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';

export abstract class CustomerCommandRepositoryGateway {
  public abstract createCustomer(props: CustomerEntity): TransactionType;
}
