import type { OrganizationEntity } from '@core/domain/schema/entity/organization/organization/organization.entity';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export abstract class OrganizationQueryRepositoryGateway {
  public abstract findOrganizationById(
    id: Guid,
  ): Promise<OrganizationEntity | null>;
}
