import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { GetAuthIdentityWithRelationsQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity-with-relations.query.result';
import type { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class AuthIdentityQueryRepositoryGateway {
  public abstract findOneAuthIdentityById(
    id: AuthIdentityId,
  ): Promise<GetAuthIdentityQueryResult | null>;

  public abstract findOneAuthIdentityByEmail(
    email: Email,
  ): Promise<GetAuthIdentityQueryResult | null>;

  public abstract findOneAuthIdentityByEmailWithRelations(
    email: Email,
  ): Promise<GetAuthIdentityWithRelationsQueryResult | null>;
}
