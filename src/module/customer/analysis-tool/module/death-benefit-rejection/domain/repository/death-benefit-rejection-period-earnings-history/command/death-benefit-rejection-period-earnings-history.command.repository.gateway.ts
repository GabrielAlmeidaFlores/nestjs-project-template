import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { DeathBenefitRejectionPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-earnings-history/death-benefit-rejection-period-earnings-history.entity';

export abstract class DeathBenefitRejectionPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionPeriodEarningsHistory(
    props: DeathBenefitRejectionPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitRejectionPeriodId(
    DeathBenefitRejectionPeriodId: DeathBenefitRejectionPeriodId,
  ): TransactionType;
}
