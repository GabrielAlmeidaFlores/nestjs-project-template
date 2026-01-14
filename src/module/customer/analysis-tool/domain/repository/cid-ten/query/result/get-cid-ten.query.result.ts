import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';

export class GetCidTenQueryResult extends BaseBuildableObject {
  public readonly id: CidTenId;
  public readonly code: string;
  public readonly description: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetCidTenQueryResult.name;
}
