import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { AuthIdentitySessionJwtWithParsedContentOutputModel } from '@module/generic/auth-identity/lib/auth-identity-session/model/output/auth-identity-session-jwt-with-parsed-content.output.model';
import type { UserLevelEnum } from '@shared/system/enum/user-level.enum';

export abstract class AuthIdentitySessionGateway {
  public abstract createSession(
    authIdentityId: AuthIdentityId,
    userLevel: UserLevelEnum,
  ): Promise<string>;

  public abstract getSession(
    jwt: string,
  ): Promise<AuthIdentitySessionJwtWithParsedContentOutputModel | null>;

  public abstract deleteSession(authIdentityId: AuthIdentityId): Promise<void>;
}
