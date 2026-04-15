import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/death-benefit-grant-period.entity';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

export abstract class DeathBenefitGrantPeriodCommandRepositoryGateway {
  public abstract createDeathBenefitGrantPeriod(
    props: DeathBenefitGrantPeriodEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrantPeriod(
    id: DeathBenefitGrantPeriodId,
    props: DeathBenefitGrantPeriodEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitGrantPeriod(
    id: DeathBenefitGrantPeriodId,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType;
}
