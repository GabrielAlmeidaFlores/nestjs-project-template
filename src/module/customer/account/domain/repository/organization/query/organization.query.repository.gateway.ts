import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export abstract class OrganizationQueryRepositoryGateway {
  public abstract findOneByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationQueryResult | null>;
}
