import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

export interface AccidentBenefitRejectionResultEntityPropsInterface extends BaseEntityPropsInterface<AccidentBenefitRejectionResultId> {
  firstAnalysis?: string | null;
  secondAnalysis?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
}
