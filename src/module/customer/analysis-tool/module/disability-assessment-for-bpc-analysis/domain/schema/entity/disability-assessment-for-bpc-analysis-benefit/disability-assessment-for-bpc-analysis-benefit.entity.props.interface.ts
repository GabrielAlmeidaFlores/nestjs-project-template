import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import type { DisabilityAssessmentForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/value-object/disability-assessment-for-bpc-analysis-benefit-id/disability-assessment-for-bpc-analysis-benefit-id.value-object';

export interface DisabilityAssessmentForBpcAnalysisBenefitEntityPropsInterface extends BaseEntityPropsInterface<DisabilityAssessmentForBpcAnalysisBenefitId> {
  inssBenefitNumber: string;
  disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity;
}
