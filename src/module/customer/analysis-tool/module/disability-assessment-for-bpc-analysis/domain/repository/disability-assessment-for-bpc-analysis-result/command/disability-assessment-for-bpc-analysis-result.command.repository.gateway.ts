import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';
import type { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';

export abstract class DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway {
  public abstract createDisabilityAssessmentForBpcAnalysisResult(
    props: DisabilityAssessmentForBpcAnalysisResultEntity,
  ): TransactionType;

  public abstract updateDisabilityAssessmentForBpcAnalysisResult(
    id: DisabilityAssessmentForBpcAnalysisResultId,
    props: DisabilityAssessmentForBpcAnalysisResultEntity,
  ): TransactionType;
}
