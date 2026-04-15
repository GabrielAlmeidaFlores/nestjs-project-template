import type { GeneralUrbanRetirementDenialResultId } from './value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface GeneralUrbanRetirementDenialResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementDenialResultId> {
  inssDecisionAnalysis?: string | null;
  firstAnalysis?: string | null;
  completeAnalysis?: string | null;
  completeAnalysisDownload?: string | null;
}
