import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import type { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

export abstract class DeathBenefitRejectionResultCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionResult(
    props: DeathBenefitRejectionResultEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejectionResult(
    id: DeathBenefitRejectionResultId,
    props: DeathBenefitRejectionResultEntity,
  ): TransactionType;
}
