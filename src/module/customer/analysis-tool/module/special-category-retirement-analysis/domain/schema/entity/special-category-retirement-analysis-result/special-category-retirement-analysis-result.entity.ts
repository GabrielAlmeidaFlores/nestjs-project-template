import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import type { SpecialCategoryRetirementAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/special-category-retirement-analysis-result.entity.props.interface';
import { SpecialCategoryRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-result/value-object/special-category-retirement-analysis-result-id/special-category-retirement-analysis-result-id.value-object';
import type { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

export class SpecialCategoryRetirementAnalysisResultEntity extends BaseEntity<SpecialCategoryRetirementAnalysisResultId> {
  public readonly specialCategoryRetirementAnalysisId: SpecialCategoryRetirementAnalysisId;
  public readonly simplifiedAnalysisSummaryText: string | null;
  public readonly fullAnalysisConclusionText: string | null;

  protected readonly _type = SpecialCategoryRetirementAnalysisResultEntity.name;

  public constructor(props: SpecialCategoryRetirementAnalysisResultEntityPropsInterface) {
    super(SpecialCategoryRetirementAnalysisResultId, props);
    this.specialCategoryRetirementAnalysisId = props.specialCategoryRetirementAnalysisId;
    this.simplifiedAnalysisSummaryText = props.simplifiedAnalysisSummaryText ?? null;
    this.fullAnalysisConclusionText = props.fullAnalysisConclusionText ?? null;
  }
}
