import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.entity';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

export abstract class SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisBenefitOriginatorIdentification(
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysisBenefitOriginatorIdentification(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisBenefitOriginatorIdentification(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): TransactionType;
}
