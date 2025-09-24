import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { AuthIdentitySessionJwtOutputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/output/auth-identity-session-jwt.output.model';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

export abstract class AuthIdentitySessionGateway {
  public abstract createSession(
    authIdentityId: AuthIdentityId,
    userLevel: UserLevelEnum,
  ): Promise<string>;

  public abstract getSessionDataFromJwt(
    jwt: string,
  ): Promise<AuthIdentitySessionJwtOutputModel | null>;

  public abstract deleteSession(authIdentityId: AuthIdentityId): Promise<void>;

  public abstract getSession(
    authIdentityId: AuthIdentityId,
  ): Promise<Guid | null>;
}
