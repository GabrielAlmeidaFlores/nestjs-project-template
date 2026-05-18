import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import type { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

export abstract class DeathBenefitGrantResultCommandRepositoryGateway {
  public abstract createDeathBenefitGrantResult(
    props: DeathBenefitGrantResultEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrantResult(
    id: DeathBenefitGrantResultId,
    props: DeathBenefitGrantResultEntity,
  ): TransactionType;
}
