import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export type ListSystemActivitiesQueryParamType = {
  page: number;
  limit: number;
  organizationId: OrganizationId | null;
  organizationMemberIdFilter: OrganizationMemberId | null;
  search: string | null;
  startDate: Date | null;
  endDate: Date | null;
};
