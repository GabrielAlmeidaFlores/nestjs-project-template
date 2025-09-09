import type { UserSessionJwtOutputModel } from '@lib/user-temp-data/model/output/user-session-jwt.output.model';
import type { CustomerId } from '@module/customer/auth/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export abstract class UserTempDataGateway {
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
