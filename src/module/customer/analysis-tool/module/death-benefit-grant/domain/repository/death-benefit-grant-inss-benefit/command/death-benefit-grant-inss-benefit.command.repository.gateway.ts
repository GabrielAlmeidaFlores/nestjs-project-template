import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-inss-benefit/death-benefit-grant-inss-benefit.entity';

export abstract class DeathBenefitGrantInssBenefitCommandRepositoryGateway {
  public abstract createDeathBenefitGrantInssBenefit(
    props: DeathBenefitGrantInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitGrantId(
    deathBenefitGrantId: DeathBenefitGrantId,
  ): TransactionType;
}
