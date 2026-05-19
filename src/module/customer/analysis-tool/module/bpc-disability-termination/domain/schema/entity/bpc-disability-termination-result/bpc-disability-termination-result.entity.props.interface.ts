import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';

export interface BpcDisabilityTerminationResultEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationResultId> {
  inssDecisionAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
}
