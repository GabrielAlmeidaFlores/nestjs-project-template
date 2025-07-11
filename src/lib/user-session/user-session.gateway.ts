import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { CustomerSessionJwtOutputModel } from '@lib/user-session/model/output/customer-session-jwt.output.model';

export abstract class UserSessionGateway {
  public abstract createCustomerSession(customerId: Guid): Promise<string>;
  public abstract getCustomerSession(customerId: Guid): Promise<Guid | null>;
  public abstract verifyCustomerSession(
    token: string,
  ): CustomerSessionJwtOutputModel | null;
}
