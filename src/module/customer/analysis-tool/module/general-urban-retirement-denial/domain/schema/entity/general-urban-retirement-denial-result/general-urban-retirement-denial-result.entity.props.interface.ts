import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementDenialResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';

export interface GeneralUrbanRetirementDenialResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
  simplifiedAnalysis?: string | null;
}
