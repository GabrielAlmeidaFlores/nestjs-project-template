import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import type { DisabilityAssessmentForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/value-object/disability-assessment-for-bpc-analysis-legal-proceeding-id/disability-assessment-for-bpc-analysis-legal-proceeding-id.value-object';

export interface DisabilityAssessmentForBpcAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<DisabilityAssessmentForBpcAnalysisLegalProceedingId> {
  legalProceedingNumber: string;
  disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity;
}
