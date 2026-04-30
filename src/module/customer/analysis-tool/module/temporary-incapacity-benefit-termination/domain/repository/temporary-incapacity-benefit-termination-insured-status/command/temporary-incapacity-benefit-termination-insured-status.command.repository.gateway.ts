import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/temporary-incapacity-benefit-termination-insured-status.entity';

export abstract class TemporaryIncapacityBenefitTerminationInsuredStatusCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationInsuredStatus(
    props: TemporaryIncapacityBenefitTerminationInsuredStatusEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationId(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): TransactionType;
}
