import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findCustomerById(id: string): Promise<CustomerEntity | null>;

  public abstract findCustomerByEmail(
    email: Email,
  ): Promise<CustomerEntity | null>;

  public abstract findCustomerByEmailOrFederalDocument(
    identifier: Email | FederalDocument,
  ): Promise<CustomerEntity | null>;
}
