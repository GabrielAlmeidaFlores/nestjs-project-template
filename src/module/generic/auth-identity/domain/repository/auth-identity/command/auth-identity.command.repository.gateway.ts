import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class AuthIdentityCommandRepositoryGateway {
  public abstract createAuthIdentity(
    props: AuthIdentityEntity,
  ): TransactionType;

  public abstract updateAuthenticatorAppSecret(
    authIdentityId: AuthIdentityId,
    authenticatorAppSecret: string,
  ): TransactionType;
}
