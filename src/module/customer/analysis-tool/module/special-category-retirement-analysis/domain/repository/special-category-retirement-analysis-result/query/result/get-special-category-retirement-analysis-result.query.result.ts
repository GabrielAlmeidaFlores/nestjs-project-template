import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export class GetSpecialCategoryRetirementAnalysisResultQueryResult {
  public readonly specialCategoryRetirementAnalysisResultId: SpecialCategoryRetirementAnalysisResultId;
  public readonly specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  public readonly simplifiedAnalysisSummaryText: string | null;
  public readonly fullAnalysisConclusionText: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type =
    GetSpecialCategoryRetirementAnalysisResultQueryResult.name;
}
