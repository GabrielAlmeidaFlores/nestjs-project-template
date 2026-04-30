import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

export interface RuralOrHybridRetirementAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisResultId> {
  firstAnalysis?: string | null;
  secondAnalysis?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysisDownload?: string | null;
  ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
}
