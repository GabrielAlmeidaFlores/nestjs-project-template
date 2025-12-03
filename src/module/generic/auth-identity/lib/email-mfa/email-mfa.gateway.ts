import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class EmailMFAGateway {
  public abstract generatePersistAndSendSignInCode(
    authIdentity: AuthIdentityId,
    authIdentityName: string,
    authIdentityEmail: Email,
  ): Promise<void>;

  public abstract validateSignInCode(
    authIdentity: AuthIdentityId,
    code: string,
  ): Promise<boolean>;
}
