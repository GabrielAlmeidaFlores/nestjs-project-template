import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

export interface TemporaryIncapacityBenefitTerminationResultEntityPropsInterface extends BaseEntityPropsInterface<TemporaryIncapacityBenefitTerminationResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
}
