import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export abstract class CustomerCommandRepositoryGateway {
  public abstract createCustomer(props: CustomerEntity): TransactionType;
  public abstract updateCustomer(
    customerId: CustomerId,
    props: CustomerEntity,
  ): TransactionType;
}
