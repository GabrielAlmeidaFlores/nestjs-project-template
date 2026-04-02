import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ListSupportAttendantsQueryParam } from '@module/support/account/domain/repository/support-attendant/query/param/list-support-attendants.query.param';
import type { GetSupportAttendantByAuthIdentityIdQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant-by-auth-identity-id.query.result';
import type { GetSupportAttendantQueryResult } from '@module/support/account/domain/repository/support-attendant/query/result/get-support-attendant.query.result';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';

export abstract class SupportAttendantQueryRepositoryGateway {
  public abstract findOneByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetSupportAttendantByAuthIdentityIdQueryResult | null>;

  public abstract findOneSupportAttendantById(
    id: SupportAttendantId,
  ): Promise<GetSupportAttendantQueryResult | null>;

  public abstract listSupportAttendants(
    queryParam: ListSupportAttendantsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportAttendantQueryResult>>;
}
