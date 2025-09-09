import type { UserSessionJwtOutputModel } from '@lib/user-session/model/output/user-session-jwt.output.model';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id.value-object';

export abstract class UserSessionGateway {
  public abstract createCustomerSession(
    customerId: CustomerId,
  ): Promise<string>;

  public abstract getCustomerSession(
    customerId: CustomerId,
  ): Promise<CustomerId | null>;

  public abstract verifySession(
    token: string,
  ): UserSessionJwtOutputModel | null;
}
