import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

export abstract class OrganizationMemberQueryRepositoryGateway {
  public abstract findOrganizationMemberById(
    id: Guid,
  ): Promise<GetOrganizationMemberQueryResult | null>;
}
