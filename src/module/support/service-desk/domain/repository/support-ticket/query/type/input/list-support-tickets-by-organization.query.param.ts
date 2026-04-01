import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';

export type ListSupportTicketsByOrganizationQueryParamType = {
  page: number;
  limit: number;
  organizationId: OrganizationId;
  requesterAuthIdentityIdFilter: AuthIdentityId | null;
  status: SupportTicketStatusEnum | null;
  search: string | null;
  startDate: Date | null;
  endDate: Date | null;
};
