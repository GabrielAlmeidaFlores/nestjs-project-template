import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import type { DeathBenefitLegalProceedingEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-proceeding/death-benefit-legal-proceeding.entity';

export abstract class DeathBenefitLegalProceedingCommandRepositoryGateway {
  public abstract createDeathBenefitLegalProceeding(
    props: DeathBenefitLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllByDeathBenefitId(
    deathBenefitId: DeathBenefitId,
  ): TransactionType;
}
