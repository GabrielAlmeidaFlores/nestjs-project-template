import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import type { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';

export class GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewPeriodDocumentId;
  public readonly document: string;
  public readonly generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult.name;
}
