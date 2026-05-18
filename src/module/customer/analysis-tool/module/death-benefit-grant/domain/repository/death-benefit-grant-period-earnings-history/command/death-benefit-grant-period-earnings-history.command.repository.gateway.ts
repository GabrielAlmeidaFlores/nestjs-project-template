import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';
import type { DeathBenefitGrantPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period-earnings-history/death-benefit-grant-period-earnings-history.entity';

export abstract class DeathBenefitGrantPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createDeathBenefitGrantPeriodEarningsHistory(
    props: DeathBenefitGrantPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantPeriodId(
    DeathBenefitGrantPeriodId: DeathBenefitGrantPeriodId,
  ): TransactionType;
}
