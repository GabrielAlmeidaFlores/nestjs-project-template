import type { GetOrganizationMemberQueryResult } from '@module/customer/auth/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { OrganizationMemberId } from '@module/customer/auth/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export abstract class OrganizationMemberQueryRepositoryGateway {
  public abstract findOrganizationMemberById(
    id: OrganizationMemberId,
  ): Promise<GetOrganizationMemberQueryResult | null>;
}
