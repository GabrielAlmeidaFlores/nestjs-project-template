import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-inss-benefit/death-benefit-rejection-inss-benefit.entity';

export abstract class DeathBenefitRejectionInssBenefitCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionInssBenefit(
    props: DeathBenefitRejectionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitRejectionId(
    deathBenefitRejectionId: DeathBenefitRejectionId,
  ): TransactionType;
}
