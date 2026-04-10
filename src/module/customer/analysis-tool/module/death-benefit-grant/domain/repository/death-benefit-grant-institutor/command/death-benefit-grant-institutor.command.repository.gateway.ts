import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import type { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

export abstract class DeathBenefitGrantInstitorCommandRepositoryGateway {
  public abstract createDeathBenefitGrantBenefitInstitutor(
    props: DeathBenefitGrantInstitorEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrantBenefitInstitutor(
    id: DeathBenefitGrantInstitorId,
    props: DeathBenefitGrantInstitorEntity,
  ): TransactionType;
}
