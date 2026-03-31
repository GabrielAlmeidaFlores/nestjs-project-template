import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListAdminSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-admin-support-tickets.query.param';
import type { ListSupportTicketsQueryParam } from '@module/customer/service-desk/domain/repository/support-ticket/query/param/list-support-tickets.query.param';
import type { GetSupportTicketDetailQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail.query.result';
import type { GetSupportTicketListItemQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-list-item.query.result';
import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export abstract class SupportTicketQueryRepositoryGateway {
  public abstract findOneSupportTicketById(
    id: SupportTicketId,
  ): Promise<GetSupportTicketDetailQueryResult | null>;

  public abstract listSupportTicketsByOrganizationId(
    organizationId: OrganizationId,
    queryParam: ListSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>>;

  public abstract listSupportTicketsByRequester(
    organizationId: OrganizationId,
    requesterAuthIdentityId: AuthIdentityId,
    queryParam: ListSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>>;

  public abstract listSupportTicketsForAdmin(
    queryParam: ListAdminSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketListItemQueryResult>>;

  public abstract countAllSupportTicketsByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number>;
}
