import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';

export interface DisabilityAssessmentForBpcAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<DisabilityAssessmentForBpcAnalysisResultId> {
  disabilityAssessmentForBpcCompleteAnalysis?: string | null;
  disabilityAssessmentForBpcSimplifiedAnalysis?: string | null;
}
