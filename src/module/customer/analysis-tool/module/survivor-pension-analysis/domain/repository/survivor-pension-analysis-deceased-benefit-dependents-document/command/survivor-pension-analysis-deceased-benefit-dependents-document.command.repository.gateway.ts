import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/survivor-pension-analysis-deceased-benefit-dependents-document.entity';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';

export abstract class SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisDeceasedBenefitDependentsDocument(
    props: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisDeceasedBenefitDependentsDocument(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisDeceasedBenefitDependentsId(
    survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): TransactionType;
}
