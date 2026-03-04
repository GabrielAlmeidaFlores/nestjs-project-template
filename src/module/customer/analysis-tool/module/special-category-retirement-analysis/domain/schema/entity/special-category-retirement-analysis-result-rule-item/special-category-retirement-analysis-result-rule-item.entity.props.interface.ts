import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialCategoryRetirementAnalysisResultRuleItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/value-object/special-category-retirement-analysis-result-rule-item-id/special-category-retirement-analysis-result-rule-item-id.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export interface SpecialCategoryRetirementAnalysisResultRuleItemEntityPropsInterface
  extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisResultRuleItemId> {
  specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  retirementModalityName: string;
  isRequirementMet: boolean;
  projectedRetirementDate?: Date | null;
  estimatedRmiAmount?: number | null;
  isBestFinancialOption: boolean;
  ruleDetailedExplanationText?: string | null;
}
