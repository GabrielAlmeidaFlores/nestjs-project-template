import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantDependentEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/death-benefit-grant-dependent.entity';
import type { DeathBenefitGrantDependentId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-dependent/value-object/death-benefit-grant-dependent-id.value-object';

export abstract class DeathBenefitGrantDependentCommandRepositoryGateway {
  public abstract createDeathBenefitGrantDependent(
    props: DeathBenefitGrantDependentEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitGrantDependent(
    id: DeathBenefitGrantDependentId,
  ): TransactionType;
}
