import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { GetSupportAttendantByAuthIdentityIdQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant-by-auth-identity-id.query.result';

export abstract class SupportAttendantQueryRepositoryGateway {
  public abstract findOneByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetSupportAttendantByAuthIdentityIdQueryResult | null>;
}
