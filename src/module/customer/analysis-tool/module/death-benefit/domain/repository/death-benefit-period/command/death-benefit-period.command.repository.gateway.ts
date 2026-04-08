import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/death-benefit-period.entity';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

export abstract class DeathBenefitPeriodCommandRepositoryGateway {
  public abstract createDeathBenefitPeriod(
    props: DeathBenefitPeriodEntity,
  ): TransactionType;

  public abstract updateDeathBenefitPeriod(
    id: DeathBenefitPeriodId,
    props: DeathBenefitPeriodEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitPeriod(
    id: DeathBenefitPeriodId,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitId(
    deathBenefitId: DeathBenefitId,
  ): TransactionType;
}
