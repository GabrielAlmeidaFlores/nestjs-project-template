import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export class GetOrganizationMemberQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationMemberId;
  public readonly owner: boolean;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetOrganizationMemberQueryResult.name;
}
