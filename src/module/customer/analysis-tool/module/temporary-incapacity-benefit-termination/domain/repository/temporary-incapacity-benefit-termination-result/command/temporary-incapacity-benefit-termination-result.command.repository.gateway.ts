import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity';

export abstract class TemporaryIncapacityBenefitTerminationResultCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationResult(
    props: TemporaryIncapacityBenefitTerminationResultEntity,
  ): TransactionType;

  public abstract updateTemporaryIncapacityBenefitTerminationResult(
    props: TemporaryIncapacityBenefitTerminationResultEntity,
  ): TransactionType;
}
