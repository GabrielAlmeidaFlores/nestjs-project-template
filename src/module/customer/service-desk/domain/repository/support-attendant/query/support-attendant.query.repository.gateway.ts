import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ListSupportAttendantsQueryParam } from '@module/customer/service-desk/domain/repository/support-attendant/query/param/list-support-attendants.query.param';
import type { GetSupportAttendantListItemQueryResult } from '@module/customer/service-desk/domain/repository/support-attendant/query/result/get-support-attendant-list-item.query.result';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class SupportAttendantQueryRepositoryGateway {
  public abstract findOneSupportAttendantById(
    id: SupportAttendantId,
  ): Promise<GetSupportAttendantListItemQueryResult | null>;

  public abstract findOneSupportAttendantByAuthIdentityId(
    authIdentityId: AuthIdentityId,
  ): Promise<GetSupportAttendantListItemQueryResult | null>;

  public abstract findOneSupportAttendantByEmail(
    email: string,
  ): Promise<GetSupportAttendantListItemQueryResult | null>;

  public abstract findAuthIdentityIdBySupportAttendantId(
    id: SupportAttendantId,
  ): Promise<AuthIdentityId | null>;

  public abstract listAllSupportAttendants(
    queryParam: ListSupportAttendantsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportAttendantListItemQueryResult>>;

  public abstract countResolvedTicketsByAttendantId(
    attendantId: SupportAttendantId,
  ): Promise<number>;
}
