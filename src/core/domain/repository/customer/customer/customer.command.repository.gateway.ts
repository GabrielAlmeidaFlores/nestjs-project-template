import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';

export abstract class CustomerCommandRepositoryGateway {
  public abstract createCustomer(data: CustomerEntity): Promise<void>;
}
