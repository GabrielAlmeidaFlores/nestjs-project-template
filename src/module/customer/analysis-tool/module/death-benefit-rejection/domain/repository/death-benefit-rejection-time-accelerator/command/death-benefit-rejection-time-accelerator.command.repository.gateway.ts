import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/death-benefit-rejection-time-accelerator.entity';
import type { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

export abstract class DeathBenefitRejectionTimeAcceleratorCommandRepositoryGateway {
  public abstract createDeathBenefitRejectionTimeAccelerator(
    props: DeathBenefitRejectionTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateDeathBenefitRejectionTimeAccelerator(
    id: DeathBenefitRejectionTimeAcceleratorId,
    props: DeathBenefitRejectionTimeAcceleratorEntity,
  ): TransactionType;
}
