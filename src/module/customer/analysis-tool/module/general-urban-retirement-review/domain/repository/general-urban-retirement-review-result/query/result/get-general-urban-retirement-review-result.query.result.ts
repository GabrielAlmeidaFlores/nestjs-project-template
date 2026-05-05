import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';

export class GetGeneralUrbanRetirementReviewResultQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewResultId;
  public readonly clientName: string | null;
  public readonly clientFederalDocument: string | null;
  public readonly clientBirthDate: Date | null;
  public readonly clientLastAffiliationDate: Date | null;
  public readonly benefitAwardLetterAnalysis: string | null;
  public readonly benefitAwardLetterAnalysisRaw: string | null;
  public readonly firstAnalysis: string | null;
  public readonly compareCnisCtps: string | null;
  public readonly compareCnisCtpsRaw: string | null;
  public readonly generalUrbanRetirementReviewCompleteAnalysis: string | null;
  public readonly generalUrbanRetirementReviewSimplifiedAnalysis: string | null;
  public readonly generalUrbanRetirementReviewCompleteAnalysisDownload:
    | string
    | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewResultQueryResult.name;
}
