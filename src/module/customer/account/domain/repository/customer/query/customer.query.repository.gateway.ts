import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';

export abstract class CustomerQueryRepositoryGateway {
  public abstract findCustomerById(
    id: Guid,
  ): Promise<GetCustomerQueryResult | null>;

  public abstract findCustomerByEmailOrFederalDocument(
    identifier: Email | FederalDocument,
  ): Promise<GetCustomerQueryResult | null>;

  public abstract findCustomerByEmail(
    email: Email,
  ): Promise<GetCustomerQueryResult | null>;
}
