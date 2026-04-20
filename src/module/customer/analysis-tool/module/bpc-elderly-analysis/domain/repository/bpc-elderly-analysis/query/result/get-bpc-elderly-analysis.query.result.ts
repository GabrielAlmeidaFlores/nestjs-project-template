import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';

export class GetBpcElderlyAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetBpcElderlyAnalysisQueryResult.name;
}
