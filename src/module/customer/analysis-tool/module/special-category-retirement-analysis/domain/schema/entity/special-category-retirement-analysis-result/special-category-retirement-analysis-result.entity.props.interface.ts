import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import type { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';

export interface SpecialCategoryRetirementAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<SpecialCategoryRetirementAnalysisResultId> {
  specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  simplifiedAnalysisSummaryText?: string | null;
  fullAnalysisConclusionText?: string | null;
}
