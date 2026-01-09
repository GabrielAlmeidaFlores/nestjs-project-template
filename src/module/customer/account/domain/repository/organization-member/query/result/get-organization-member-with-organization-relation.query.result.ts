import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export class GetOrganizationMemberWithOrganizationRelationQueryResult extends BaseBuildableObject {
  public readonly id: OrganizationMemberId;
  public readonly owner: boolean;
  public readonly organizationId: OrganizationId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetOrganizationMemberWithOrganizationRelationQueryResult.name;
}
