import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { SurvivorPensionAnalysisResultRetirementRuleId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-retirement-rule/value-object/survivor-pension-analysis-result-retirement-rule-id/survivor-pension-analysis-result-retirement-rule-id.value-object';

export interface SurvivorPensionAnalysisResultRetirementRuleEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisResultRetirementRuleId> {
  survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;
  ruleName?: string | null;
  isRequirementMet?: boolean | null;
  entitlementDate?: Date | null;
  estimatedRmi?: DecimalValue | null;
  isBestRmi?: boolean | null;
  isHighestClaimValue?: boolean | null;
  detailedAnalysis?: string | null;
}
