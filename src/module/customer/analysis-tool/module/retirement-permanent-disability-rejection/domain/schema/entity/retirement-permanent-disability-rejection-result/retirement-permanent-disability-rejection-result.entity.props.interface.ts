import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

export interface RetirementPermanentDisabilityRejectionResultEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRejectionResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
}
