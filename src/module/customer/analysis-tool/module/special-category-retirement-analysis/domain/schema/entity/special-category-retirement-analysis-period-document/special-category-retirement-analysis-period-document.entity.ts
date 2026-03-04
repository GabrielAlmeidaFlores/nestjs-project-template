import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import type { RetirementDocumentTypeCategoryEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/enum/retirement-document-type-category.enum';
import type { SpecialCategoryRetirementAnalysisPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.entity.props.interface';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import type { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

export class SpecialCategoryRetirementAnalysisPeriodDocumentEntity extends BaseEntity<SpecialCategoryRetirementAnalysisPeriodDocumentId> {
  public readonly specialCategoryRetirementAnalysisWorkPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId;
  public readonly storedFileExternalName: string;
  public readonly originalFileUploadName: string;
  public readonly retirementDocumentTypeCategory: RetirementDocumentTypeCategoryEnum;

  protected readonly _type = SpecialCategoryRetirementAnalysisPeriodDocumentEntity.name;

  public constructor(props: SpecialCategoryRetirementAnalysisPeriodDocumentEntityPropsInterface) {
    super(SpecialCategoryRetirementAnalysisPeriodDocumentId, props);
    this.specialCategoryRetirementAnalysisWorkPeriodId = props.specialCategoryRetirementAnalysisWorkPeriodId;
    this.storedFileExternalName = props.storedFileExternalName;
    this.originalFileUploadName = props.originalFileUploadName;
    this.retirementDocumentTypeCategory = props.retirementDocumentTypeCategory;
  }
}
