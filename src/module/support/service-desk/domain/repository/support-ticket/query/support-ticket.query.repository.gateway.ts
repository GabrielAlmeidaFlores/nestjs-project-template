import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { ListSupportTicketsByOrganizationQueryParam } from '@module/support/service-desk/domain/repository/support-ticket/query/param/list-support-tickets-by-organization.query.param';
import type { ListSupportTicketsQueryParam } from '@module/support/service-desk/domain/repository/support-ticket/query/param/list-support-tickets.query.param';
import type { GetSupportTicketQueryResult } from '@module/support/service-desk/domain/repository/support-ticket/query/result/get-support-ticket.query.result';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTicketNumber } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-number/support-ticket-number.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export abstract class SupportTicketQueryRepositoryGateway {
  public abstract listPaginated(
    param: ListSupportTicketsQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketQueryResult>>;
  public abstract listPaginatedByOrganization(
    param: ListSupportTicketsByOrganizationQueryParam,
  ): Promise<ListDataOutputModel<GetSupportTicketQueryResult>>;

  public abstract findOneByIdAndSupportType(
    supportTicketId: SupportTicketId,
    supportType: SupportTypeEnum,
  ): Promise<GetSupportTicketQueryResult | null>;

  public abstract findOneByIdAndSupportTypeWithAttachments(
    supportTicketId: SupportTicketId,
    supportType: SupportTypeEnum,
  ): Promise<GetSupportTicketQueryResult | null>;

  public abstract findOneByIdAndOrganization(
    supportTicketId: SupportTicketId,
    organizationId: OrganizationId,
    requesterAuthIdentityIdFilter: AuthIdentityId | null,
  ): Promise<GetSupportTicketQueryResult | null>;

  public abstract findOneByIdAndOrganizationWithAttachments(
    supportTicketId: SupportTicketId,
    organizationId: OrganizationId,
    requesterAuthIdentityIdFilter: AuthIdentityId | null,
  ): Promise<GetSupportTicketQueryResult | null>;

  public abstract findLastTicketNumberByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<SupportTicketNumber | null>;

  public abstract countResolvedTicketsByAttendantIds(
    attendantIds: SupportAttendantId[],
  ): Promise<Map<SupportAttendantId, number>>;
}
