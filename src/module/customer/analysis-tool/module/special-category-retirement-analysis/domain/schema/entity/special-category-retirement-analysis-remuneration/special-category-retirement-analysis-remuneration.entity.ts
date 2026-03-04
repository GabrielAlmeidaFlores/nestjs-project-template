import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import type { SpecialCategoryRetirementAnalysisRemunerationEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/special-category-retirement-analysis-remuneration.entity.props.interface';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export class SpecialCategoryRetirementAnalysisRemunerationEntity extends BaseEntity<SpecialCategoryRetirementAnalysisRemunerationId> {
  public readonly specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  public readonly remunerationReferenceMonthYear: Date;
  public readonly remunerationGrossAmount: number | null;

  protected readonly _type = SpecialCategoryRetirementAnalysisRemunerationEntity.name;

  public constructor(props: SpecialCategoryRetirementAnalysisRemunerationEntityPropsInterface) {
    super(SpecialCategoryRetirementAnalysisRemunerationId, props);
    this.specialCategoryRetirementAnalysisId = props.specialCategoryRetirementAnalysisId;
    this.remunerationReferenceMonthYear = props.remunerationReferenceMonthYear;
    this.remunerationGrossAmount = props.remunerationGrossAmount ?? null;
  }
}
