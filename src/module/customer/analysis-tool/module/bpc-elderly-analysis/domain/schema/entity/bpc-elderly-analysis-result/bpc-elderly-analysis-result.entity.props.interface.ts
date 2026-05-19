import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyAnalysisResultId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/value-object/bpc-elderly-analysis-result-id/bpc-elderly-analysis-result-id.value-object';

export interface BpcElderlyAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyAnalysisResultId> {
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
}
