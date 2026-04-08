import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitResultEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/death-benefit-result.entity';
import type { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

export abstract class DeathBenefitResultCommandRepositoryGateway {
  public abstract createDeathBenefitResult(
    props: DeathBenefitResultEntity,
  ): TransactionType;

  public abstract updateDeathBenefitResult(
    id: DeathBenefitResultId,
    props: DeathBenefitResultEntity,
  ): TransactionType;
}
