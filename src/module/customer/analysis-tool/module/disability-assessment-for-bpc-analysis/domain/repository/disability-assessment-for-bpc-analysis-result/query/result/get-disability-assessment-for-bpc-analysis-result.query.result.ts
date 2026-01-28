import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';

export class GetDisabilityAssessmentForBpcAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityAssessmentForBpcAnalysisResultId;
  public readonly disabilityAssessmentForBpcCompleteAnalysis: string | null;
  public readonly disabilityAssessmentForBpcSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisResultQueryResult.name;
}
