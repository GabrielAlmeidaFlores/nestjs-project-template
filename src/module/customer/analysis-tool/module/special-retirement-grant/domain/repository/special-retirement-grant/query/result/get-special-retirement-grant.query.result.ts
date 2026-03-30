import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

export class GetSpecialRetirementGrantQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantId;
  public readonly name: string;
  public readonly specialActivity: boolean;
  public readonly cnisDocument: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetSpecialRetirementGrantQueryResult.name;
}
