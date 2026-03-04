import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementDocumentTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/enum/retirement-document-type-category.enum';
import type { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

export interface SpecialCategoryRetirementAnalysisPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisPeriodDocumentId> {
  specialCategoryRetirementAnalysisWorkPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId;
  storedFileExternalName: string;
  originalFileUploadName: string;
  retirementDocumentTypeCategory: RetirementDocumentTypeCategoryEnum;
}
