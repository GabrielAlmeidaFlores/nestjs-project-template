import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';

export class GetSurvivorPensionAnalysisResultRetirementRuleQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisResultRetirementRuleId;
  public readonly survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;
  public readonly ruleName: string | null;
  public readonly isRequirementMet: boolean | null;
  public readonly entitlementDate: Date | null;
  public readonly estimatedRmi: DecimalValue | null;
  public readonly isBestRmi: boolean | null;
  public readonly isHighestClaimValue: boolean | null;
  public readonly detailedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisResultRetirementRuleQueryResult.name;
}
