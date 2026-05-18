import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/death-benefit-grant.entity';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

export abstract class DeathBenefitGrantCommandRepositoryGateway {
  public abstract createDeathBenefitGrant(
    props: DeathBenefitGrantEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrant(
    id: DeathBenefitGrantId,
    props: DeathBenefitGrantEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrantResultId(
    id: DeathBenefitGrantId,
    resultId: DeathBenefitGrantResultId,
  ): TransactionType;
}
