import type { GetSpecialCategoryRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result/query/result/get-special-category-retirement-analysis-result.query.result';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export abstract class SpecialCategoryRetirementAnalysisResultQueryRepositoryGateway {
  public abstract findOneByAnalysisIdOrNull(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisResultQueryResult | null>;
}
