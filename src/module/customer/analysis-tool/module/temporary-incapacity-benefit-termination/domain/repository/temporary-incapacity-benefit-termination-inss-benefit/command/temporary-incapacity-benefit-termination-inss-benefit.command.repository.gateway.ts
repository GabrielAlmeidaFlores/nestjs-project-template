import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInssBenefitEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-inss-benefit/temporary-incapacity-benefit-termination-inss-benefit.entity';

export abstract class TemporaryIncapacityBenefitTerminationInssBenefitCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationInssBenefit(
    props: TemporaryIncapacityBenefitTerminationInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationId(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): TransactionType;
}
