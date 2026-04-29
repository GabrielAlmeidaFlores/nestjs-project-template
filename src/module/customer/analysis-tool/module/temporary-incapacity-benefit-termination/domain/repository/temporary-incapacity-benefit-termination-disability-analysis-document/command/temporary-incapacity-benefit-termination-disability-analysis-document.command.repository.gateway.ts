import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document/temporary-incapacity-benefit-termination-disability-analysis-document.entity';

export abstract class TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationDisabilityAnalysisDocument(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationDisabilityAnalysisId(
    temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId,
  ): TransactionType;
}
