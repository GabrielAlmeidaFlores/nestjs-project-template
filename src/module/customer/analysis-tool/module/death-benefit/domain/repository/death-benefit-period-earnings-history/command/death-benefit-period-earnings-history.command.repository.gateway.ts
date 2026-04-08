import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import type { DeathBenefitPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-earnings-history/death-benefit-period-earnings-history.entity';

export abstract class DeathBenefitPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createDeathBenefitPeriodEarningsHistory(
    props: DeathBenefitPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitPeriodId(
    deathBenefitPeriodId: DeathBenefitPeriodId,
  ): TransactionType;
}
