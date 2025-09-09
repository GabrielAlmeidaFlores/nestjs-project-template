import type { GetAuthIdentityQueryResult } from '@module/generic/auth/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import type { AuthIdentityId } from '@module/generic/auth/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class AuthIdentityQueryRepositoryGateway {
  public abstract findAuthIdentityById(
    id: AuthIdentityId,
  ): Promise<GetAuthIdentityQueryResult | null>;
}
