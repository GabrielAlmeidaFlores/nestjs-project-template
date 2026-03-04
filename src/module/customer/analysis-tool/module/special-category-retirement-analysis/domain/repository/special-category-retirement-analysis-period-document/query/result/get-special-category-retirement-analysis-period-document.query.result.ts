import type { RetirementDocumentTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/enum/retirement-document-type-category.enum';
import type { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

export class GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult {
  public readonly specialCategoryRetirementAnalysisPeriodDocumentId: SpecialCategoryRetirementAnalysisPeriodDocumentId;
  public readonly specialCategoryRetirementAnalysisWorkPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId;
  public readonly storedFileExternalName: string;
  public readonly originalFileUploadName: string;
  public readonly retirementDocumentTypeCategory: RetirementDocumentTypeCategoryEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected readonly _type = GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult.name;
}
