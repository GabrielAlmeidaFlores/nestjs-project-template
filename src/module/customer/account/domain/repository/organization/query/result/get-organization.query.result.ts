import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id.value-object';

export class GetOrganizationQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationId;
  public readonly name: string;
  public readonly organizationLogo: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetOrganizationQueryResult.name;
}
