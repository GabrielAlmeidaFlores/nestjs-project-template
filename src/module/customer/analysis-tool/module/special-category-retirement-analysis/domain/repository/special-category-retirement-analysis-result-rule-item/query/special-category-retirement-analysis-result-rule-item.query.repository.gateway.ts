import type { GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/query/result/get-special-category-retirement-analysis-result-rule-item.query.result';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisResultRuleItemQueryRepositoryGateway {
  public abstract listByResultId(
    resultId: SpecialCategoryRetirementAnalysisResultId,
  ): Promise<GetSpecialCategoryRetirementAnalysisResultRuleItemQueryResult[]>;
}
