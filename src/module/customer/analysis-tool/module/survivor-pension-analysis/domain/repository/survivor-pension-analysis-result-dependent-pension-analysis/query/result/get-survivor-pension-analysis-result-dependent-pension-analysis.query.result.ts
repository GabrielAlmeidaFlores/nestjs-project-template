import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';

export class GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisResultDependentPensionAnalysisId;
  public readonly survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;
  public readonly dependentName: string | null;
  public readonly dependencyDegree: string | null;
  public readonly isDependencyVerified: boolean | null;
  public readonly pensionStartDate: Date | null;
  public readonly estimatedPensionDuration: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult.name;
}
