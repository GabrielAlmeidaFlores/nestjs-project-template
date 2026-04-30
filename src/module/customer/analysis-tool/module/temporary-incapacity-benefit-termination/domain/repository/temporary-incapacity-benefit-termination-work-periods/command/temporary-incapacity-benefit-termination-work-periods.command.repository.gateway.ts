import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { TemporaryIncapacityBenefitTerminationWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/temporary-incapacity-benefit-termination-work-periods.entity';

export abstract class TemporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationWorkPeriods(
    props: TemporaryIncapacityBenefitTerminationWorkPeriodsEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationId(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): TransactionType;
}
