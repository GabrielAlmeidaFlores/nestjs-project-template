import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/temporary-incapacity-benefit-rejection-disability-analysis.entity';

export abstract class TemporaryIncapacityBenefitRejectionDisabilityAnalysisCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionDisabilityAnalysis(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitRejectionId(
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
  ): TransactionType;
}
