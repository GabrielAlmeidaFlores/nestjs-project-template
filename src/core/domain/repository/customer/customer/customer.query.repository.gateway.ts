import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findCustomerByEmail(
    email: Email,
  ): Promise<CustomerEntity | null>;
}
