import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AdminId } from '@module/admin/account/domain/schema/entity/admin/value-object/admin-id/admin-id.value-object';

export class GetAdminQueryResult extends BaseBuildableObject {
  public readonly id: AdminId;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetAdminQueryResult.name;
}
