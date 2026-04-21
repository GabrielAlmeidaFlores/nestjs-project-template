import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/death-benefit-rejection.entity';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

export abstract class DeathBenefitRejectionCommandRepositoryGateway {
  public abstract createDeathBenefitRejection(
    props: DeathBenefitRejectionEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejection(
    id: DeathBenefitRejectionId,
    props: DeathBenefitRejectionEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejectionResultId(
    id: DeathBenefitRejectionId,
    resultId: DeathBenefitRejectionResultId,
  ): TransactionType;
}
