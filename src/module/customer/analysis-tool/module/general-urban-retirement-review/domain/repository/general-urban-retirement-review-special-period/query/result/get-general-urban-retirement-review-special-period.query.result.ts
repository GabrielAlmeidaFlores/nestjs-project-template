import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';

export class GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementReviewSpecialPeriodId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly response: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult.name;
}
