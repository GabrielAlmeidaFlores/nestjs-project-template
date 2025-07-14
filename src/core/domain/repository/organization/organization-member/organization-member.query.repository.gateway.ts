import type { OrganizationMemberEntity } from '@core/domain/schema/entity/organization/organization-member/organization-member.entity';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export abstract class OrganizationMemberQueryRepositoryGateway {
  public abstract findOrganizationMemberById(
    email: Guid,
  ): Promise<OrganizationMemberEntity | null>;
}
