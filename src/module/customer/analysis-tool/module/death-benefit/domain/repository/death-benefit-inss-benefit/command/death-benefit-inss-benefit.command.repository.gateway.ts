import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity';

export abstract class DeathBenefitInssBenefitCommandRepositoryGateway {
  public abstract createDeathBenefitInssBenefit(
    props: DeathBenefitInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitId(
    deathBenefitId: DeathBenefitId,
  ): TransactionType;
}
