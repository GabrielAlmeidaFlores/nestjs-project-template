import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import type { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';

export class GetGeneralUrbanRetirementReviewQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewId;
  public readonly cnisDocument: string | null;
  public readonly benefitAwardLetterDocument: string | null;
  public readonly analysisName: string | null;
  public readonly category: string | null;
  public readonly myInssPassword: string | null;
  public readonly generalUrbanRetirementReviewResult: GeneralUrbanRetirementReviewResultEntity | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewQueryResult.name;
}
