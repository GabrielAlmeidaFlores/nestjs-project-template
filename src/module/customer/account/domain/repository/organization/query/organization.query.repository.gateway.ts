import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export abstract class OrganizationQueryRepositoryGateway {
  public abstract findOneOrganizationById(
    id: OrganizationId,
  ): Promise<GetOrganizationQueryResult | null>;
}
