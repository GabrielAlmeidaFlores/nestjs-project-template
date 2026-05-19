import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisResultEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity.props.interface';

export class RuralOrHybridRetirementAnalysisResultEntity extends BaseEntity<RuralOrHybridRetirementAnalysisResultId> {
  public readonly firstAnalysis: string | null;
  public readonly secondAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysisDownload: string | null;
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected readonly _type = RuralOrHybridRetirementAnalysisResultEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisResultEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisResultId, props);
    this.firstAnalysis = props.firstAnalysis ?? null;
    this.secondAnalysis = props.secondAnalysis ?? null;
    this.completeAnalysis = props.completeAnalysis ?? null;
    this.simplifiedAnalysis = props.simplifiedAnalysis ?? null;
    this.completeAnalysisDownload = props.completeAnalysisDownload ?? null;
    this.simplifiedAnalysisDownload = props.simplifiedAnalysisDownload ?? null;
    this.ruralOrHybridRetirementAnalysisId =
      props.ruralOrHybridRetirementAnalysisId;
  }
}
