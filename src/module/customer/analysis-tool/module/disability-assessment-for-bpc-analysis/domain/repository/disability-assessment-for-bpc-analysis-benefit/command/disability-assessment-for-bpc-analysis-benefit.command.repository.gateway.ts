import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import type { DisabilityAssessmentForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/value-object/disability-assessment-for-bpc-analysis-benefit-id/disability-assessment-for-bpc-analysis-benefit-id.value-object';

export abstract class DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway {
  public abstract createDisabilityAssessmentForBpcAnalysisBenefit(
    props: DisabilityAssessmentForBpcAnalysisBenefitEntity,
  ): TransactionType;

  public abstract deleteDisabilityAssessmentForBpcAnalysisBenefit(
    id: DisabilityAssessmentForBpcAnalysisBenefitId,
  ): TransactionType;
}
