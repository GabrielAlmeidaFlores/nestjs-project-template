import type { SpecialCategoryRetirementAnalysisResultRuleItemId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result-rule-item/value-object/special-category-retirement-analysis-result-rule-item-id/special-category-retirement-analysis-result-rule-item-id.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export class GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult {
  public readonly specialCategoryRetirementAnalysisResultRuleItemId: SpecialCategoryRetirementAnalysisResultRuleItemId;
  public readonly specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  public readonly retirementModalityName: string;
  public readonly isRequirementMet: boolean;
  public readonly projectedRetirementDate: Date | null;
  public readonly estimatedRmiAmount: number | null;
  public readonly isBestFinancialOption: boolean;
  public readonly ruleDetailedExplanationText: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type = GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult.name;
}
