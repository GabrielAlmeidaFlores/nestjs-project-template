import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyAnalysisResultId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/value-object/bpc-elderly-analysis-result-id/bpc-elderly-analysis-result-id.value-object';

export class GetBpcElderlyAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyAnalysisResultId;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyAnalysisResultQueryResult.name;
}
