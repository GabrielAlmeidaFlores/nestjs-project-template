import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/death-benefit.entity';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

export abstract class DeathBenefitCommandRepositoryGateway {
  public abstract createDeathBenefit(props: DeathBenefitEntity): TransactionType;

  public abstract updateDeathBenefit(
    id: DeathBenefitId,
    props: DeathBenefitEntity,
  ): TransactionType;

  public abstract updateDeathBenefitResultId(
    id: DeathBenefitId,
    resultId: DeathBenefitResultId,
  ): TransactionType;
}
