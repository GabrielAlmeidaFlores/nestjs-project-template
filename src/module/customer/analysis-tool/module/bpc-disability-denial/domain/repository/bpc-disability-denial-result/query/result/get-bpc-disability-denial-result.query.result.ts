import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';

export class GetBpcDisabilityDenialResultQueryResult extends BaseBuildableObject {
  public readonly id: BpcDisabilityDenialResultId;
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly applicableRules: string | null;
  public readonly benefitSummaries: string | null;
  public readonly analysisDetailedText: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcDisabilityDenialResultQueryResult.name;
}
