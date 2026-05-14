import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/permanent-incapacity-benefit-terminated-disability-analysis-document.entity';

export abstract class PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocument(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
    permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId,
  ): TransactionType;
}
