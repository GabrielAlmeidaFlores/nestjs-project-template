import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';

export class GetSpecialActivityResultQueryResult extends BaseBuildableObject {
  public readonly id: SpecialActivityResultId;
  public readonly specialActivityCompleteAnalysis: string | null;
  public readonly specialActivitySimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetSpecialActivityResultQueryResult.name;
}
