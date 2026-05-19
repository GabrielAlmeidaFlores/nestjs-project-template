import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';

export abstract class TemporaryIncapacityBenefitRejectionResultCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionResult(
    props: TemporaryIncapacityBenefitRejectionResultEntity,
  ): TransactionType;

  public abstract updateTemporaryIncapacityBenefitRejectionResult(
    props: TemporaryIncapacityBenefitRejectionResultEntity,
  ): TransactionType;
}
