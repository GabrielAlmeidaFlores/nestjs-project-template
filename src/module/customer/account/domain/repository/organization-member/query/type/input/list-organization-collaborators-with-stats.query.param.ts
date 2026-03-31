import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export type ListOrganizationCollaboratorsWithStatsQueryParamType = {
  page: number;
  limit: number;
  organizationId: OrganizationId | null;
  search: string | null;
};
