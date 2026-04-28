import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';

export class GetBpcDisabilityTerminationResultQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityTerminationResultId;
  public readonly inssDecisionAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityTerminationResultQueryResult.name;
}
