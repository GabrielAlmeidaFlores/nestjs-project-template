import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';

export abstract class TemporaryIncapacityBenefitRejectionCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejection(
    props: TemporaryIncapacityBenefitRejectionEntity,
  ): TransactionType;

  public abstract updateTemporaryIncapacityBenefitRejection(
    id: TemporaryIncapacityBenefitRejectionId,
    props: TemporaryIncapacityBenefitRejectionEntity,
  ): TransactionType;

  public abstract updateTemporaryIncapacityBenefitRejectionResultId(
    id: TemporaryIncapacityBenefitRejectionId,
    resultId: TemporaryIncapacityBenefitRejectionResultId,
  ): TransactionType;
}
