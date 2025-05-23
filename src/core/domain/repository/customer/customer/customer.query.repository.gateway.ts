import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer.entity';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findCustomerByUniqueKeys(
    email: Email,
    phoneNumber: PhoneNumber,
  ): Promise<CustomerEntity | null>;
}
