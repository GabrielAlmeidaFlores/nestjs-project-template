import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/survivor-pension-analysis-benefit-originator-identification-document.entity';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';

export abstract class SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisBenefitOriginatorIdentificationDocument(
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisBenefitOriginatorIdentificationDocument(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisBenefitOriginatorIdentificationId(
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): TransactionType;
}
