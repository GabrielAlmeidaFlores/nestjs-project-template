import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';

export class GetSpecialActivityAnalysisInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: SpecialActivityInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialActivityAnalysisInssBenefitQueryResult.name;
}
