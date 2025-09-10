import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class AuthIdentityQueryRepositoryGateway {
  public abstract findAuthIdentityById(
    id: AuthIdentityId,
  ): Promise<GetAuthIdentityQueryResult | null>;

  public abstract findAuthIdentityByEmailOrFederalDocument(
    value: FederalDocument | Email,
  ): Promise<GetAuthIdentityQueryResult | null>;
}
