import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import type { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

export abstract class DeathBenefitRejectionInstitorCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionBenefitInstitutor(
    props: DeathBenefitRejectionInstitorEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejectionBenefitInstitutor(
    id: DeathBenefitRejectionInstitorId,
    props: DeathBenefitRejectionInstitorEntity,
  ): TransactionType;

  public abstract deleteDeathBenefitRejectionBenefitInstitutor(
    id: DeathBenefitRejectionInstitorId,
  ): TransactionType;
}
