import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

export class GetSurvivorPensionAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisQueryResult.name;
}
