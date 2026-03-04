import type { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export class GetSpecialCategoryRetirementAnalysisRemunerationQueryResult {
  public readonly specialCategoryRetirementAnalysisRemunerationId: SpecialCategoryRetirementAnalysisRemunerationId;
  public readonly specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  public readonly remunerationReferenceMonthYear: Date;
  public readonly remunerationGrossAmount: number | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type = GetSpecialCategoryRetirementAnalysisRemunerationQueryResult.name;
}
