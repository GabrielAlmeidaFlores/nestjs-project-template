import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AuthIdentityEntity } from '@module/generic/auth/domain/schema/entity/auth-identity/auth-identity.entity';

export abstract class AuthIdentityCommandRepositoryGateway {
  public abstract createAuthIdentity(
    props: AuthIdentityEntity,
  ): TransactionType;
}
