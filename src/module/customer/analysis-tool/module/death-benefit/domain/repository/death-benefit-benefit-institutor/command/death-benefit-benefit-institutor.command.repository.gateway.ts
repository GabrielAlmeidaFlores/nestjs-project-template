import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitBenefitInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/death-benefit-benefit-institutor.entity';
import type { DeathBenefitBenefitInstitorId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/value-object/death-benefit-benefit-institutor-id.value-object';

export abstract class DeathBenefitBenefitInstitorCommandRepositoryGateway {
  public abstract createDeathBenefitBenefitInstitutor(
    props: DeathBenefitBenefitInstitorEntity,
  ): TransactionType;

  public abstract updateDeathBenefitBenefitInstitutor(
    id: DeathBenefitBenefitInstitorId,
    props: DeathBenefitBenefitInstitorEntity,
  ): TransactionType;
}
