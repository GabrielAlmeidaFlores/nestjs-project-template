import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';

export abstract class OrganizationQueryRepositoryGateway {
  public abstract findOrganizationById(
    id: Guid,
  ): Promise<GetOrganizationQueryResult | null>;
}
