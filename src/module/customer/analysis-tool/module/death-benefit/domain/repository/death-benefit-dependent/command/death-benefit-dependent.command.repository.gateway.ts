import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitDependentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-dependent/death-benefit-dependent.entity';

export abstract class DeathBenefitDependentCommandRepositoryGateway {
  public abstract createDeathBenefitDependent(
    props: DeathBenefitDependentEntity,
  ): TransactionType;
}
