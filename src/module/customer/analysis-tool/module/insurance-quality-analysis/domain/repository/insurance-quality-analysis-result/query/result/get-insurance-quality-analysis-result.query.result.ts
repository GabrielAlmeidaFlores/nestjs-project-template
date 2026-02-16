import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';

export class GetInsuranceQualityAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: InsuranceQualityAnalysisResultId;
  public readonly insuranceQualityConclusion: string | null;
  public readonly gracePeriodConclusion: string | null;
  public readonly finalRecommendation: string | null;
  public readonly analysisSummary: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetInsuranceQualityAnalysisResultQueryResult.name;
}
