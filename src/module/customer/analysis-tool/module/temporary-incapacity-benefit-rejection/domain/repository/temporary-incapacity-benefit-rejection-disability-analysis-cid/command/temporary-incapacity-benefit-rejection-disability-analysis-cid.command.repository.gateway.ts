import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid.entity';

export abstract class TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionDisabilityAnalysisCid(
    props: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitRejectionDisabilityAnalysisId(
    temporaryIncapacityBenefitRejectionDisabilityAnalysisId: TemporaryIncapacityBenefitRejectionDisabilityAnalysisId,
  ): TransactionType;
}
