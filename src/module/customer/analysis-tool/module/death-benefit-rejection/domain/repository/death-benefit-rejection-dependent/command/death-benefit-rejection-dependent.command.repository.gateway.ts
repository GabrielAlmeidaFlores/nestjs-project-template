import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/death-benefit-rejection-dependent.entity';
import type { DeathBenefitRejectionDependentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-dependent/value-object/death-benefit-rejection-dependent-id.value-object';

export abstract class DeathBenefitRejectionDependentCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionDependent(
    props: DeathBenefitRejectionDependentEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitRejectionDependent(
    id: DeathBenefitRejectionDependentId,
  ): TransactionType;
}
