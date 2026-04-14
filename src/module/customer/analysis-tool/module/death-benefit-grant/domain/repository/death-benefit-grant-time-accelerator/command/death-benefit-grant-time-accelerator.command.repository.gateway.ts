import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DeathBenefitGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/death-benefit-grant-time-accelerator.entity';
import type { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

export abstract class DeathBenefitGrantTimeAcceleratorCommandRepositoryGateway {
  public abstract createDeathBenefitGrantTimeAccelerator(
    props: DeathBenefitGrantTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateDeathBenefitGrantTimeAccelerator(
    id: DeathBenefitGrantTimeAcceleratorId,
    props: DeathBenefitGrantTimeAcceleratorEntity,
  ): TransactionType;
}
