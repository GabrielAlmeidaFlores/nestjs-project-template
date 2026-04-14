import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-dependent-pension-analysis/query/result/get-survivor-pension-analysis-result-dependent-pension-analysis.query.result';
import type { GetSurvivorPensionAnalysisResultRetirementRuleQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result-retirement-rule/query/result/get-survivor-pension-analysis-result-retirement-rule.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

export class GetSurvivorPensionAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisResultId;
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  public readonly isInsuredStatusConfirmed: boolean | null;
  public readonly insuredStatusSummary: string | null;
  public readonly isRetirementRightConfirmed: boolean | null;
  public readonly retirementRightSummary: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly retirementRules: GetSurvivorPensionAnalysisResultRetirementRuleQueryResult[];
  public readonly dependentPensionAnalyses: GetSurvivorPensionAnalysisResultDependentPensionAnalysisQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisResultQueryResult.name;
}
