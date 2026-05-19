import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document/temporary-incapacity-benefit-rejection-disability-analysis-document.entity';

export abstract class TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionDisabilityAnalysisDocument(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitRejectionDisabilityAnalysisId(
    temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId,
  ): TransactionType;
}
