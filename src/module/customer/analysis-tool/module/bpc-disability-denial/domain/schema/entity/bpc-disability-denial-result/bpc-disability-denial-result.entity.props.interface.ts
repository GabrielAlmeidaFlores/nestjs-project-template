import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';

export interface BpcDisabilityDenialResultEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityDenialResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
  applicableRules?: string | null;
  benefitSummaries?: string | null;
  analysisDetailedText?: string | null;
}
