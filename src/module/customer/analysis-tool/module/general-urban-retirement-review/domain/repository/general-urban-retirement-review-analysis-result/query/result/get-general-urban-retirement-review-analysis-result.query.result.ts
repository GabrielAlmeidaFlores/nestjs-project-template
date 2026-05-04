import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/enum/analysis-type.enum';
import type { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

export class GetGeneralUrbanRetirementReviewAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewAnalysisResultId;
  public readonly analysisType: AnalysisTypeEnum | null;
  public readonly response: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly generalUrbanRetirementReview: GeneralUrbanRetirementReviewEntity | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewAnalysisResultQueryResult.name;
}
