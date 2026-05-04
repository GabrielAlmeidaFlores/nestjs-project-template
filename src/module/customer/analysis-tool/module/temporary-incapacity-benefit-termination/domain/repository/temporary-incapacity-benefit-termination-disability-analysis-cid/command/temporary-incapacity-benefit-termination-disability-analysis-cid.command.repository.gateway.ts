import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import type { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/temporary-incapacity-benefit-termination-disability-analysis-cid.entity';

export abstract class TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationDisabilityAnalysisCid(
    props: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationDisabilityAnalysisId(
    temporaryIncapacityBenefitTerminationDisabilityAnalysisId: TemporaryIncapacityBenefitTerminationDisabilityAnalysisId,
  ): TransactionType;
}
