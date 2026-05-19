import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';

export interface SpecialCategoryRetirementAnalysisRemunerationEntityPropsInterface extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisRemunerationId> {
  specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  remunerationReferenceMonthYear: Date;
  remunerationGrossAmount?: DecimalValue | null;
}
