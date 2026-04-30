import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.entity';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

export abstract class TemporaryIncapacityBenefitTerminationCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTermination(
    props: TemporaryIncapacityBenefitTerminationEntity,
  ): TransactionType;

  public abstract updateTemporaryIncapacityBenefitTermination(
    id: TemporaryIncapacityBenefitTerminationId,
    props: TemporaryIncapacityBenefitTerminationEntity,
  ): TransactionType;

  public abstract updateTemporaryIncapacityBenefitTerminationResultId(
    id: TemporaryIncapacityBenefitTerminationId,
    resultId: TemporaryIncapacityBenefitTerminationResultId,
  ): TransactionType;
}
