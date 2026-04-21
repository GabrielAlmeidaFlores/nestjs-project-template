import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionPeriodEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/death-benefit-rejection-period.entity';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';

export abstract class DeathBenefitRejectionPeriodCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionPeriod(
    props: DeathBenefitRejectionPeriodEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejectionPeriod(
    id: DeathBenefitRejectionPeriodId,
    props: DeathBenefitRejectionPeriodEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitRejectionPeriod(
    id: DeathBenefitRejectionPeriodId,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitRejectionId(
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): TransactionType;
}
