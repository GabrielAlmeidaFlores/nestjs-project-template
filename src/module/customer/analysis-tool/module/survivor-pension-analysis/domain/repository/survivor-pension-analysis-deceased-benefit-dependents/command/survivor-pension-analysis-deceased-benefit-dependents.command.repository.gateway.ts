import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/survivor-pension-analysis-deceased-benefit-dependents.entity';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';

export abstract class SurvivorPensionAnalysisDeceasedBenefitDependentsCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisDeceasedBenefitDependents(
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysisDeceasedBenefitDependents(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisDeceasedBenefitDependents(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): TransactionType;
}
