import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import type { DisabilityAssessmentForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/value-object/disability-assessment-for-bpc-analysis-legal-proceeding-id/disability-assessment-for-bpc-analysis-legal-proceeding-id.value-object';

export abstract class DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createDisabilityAssessmentForBpcAnalysisLegalProceeding(
    props: DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteDisabilityAssessmentForBpcAnalysisLegalProceeding(
    id: DisabilityAssessmentForBpcAnalysisLegalProceedingId,
  ): TransactionType;
}
