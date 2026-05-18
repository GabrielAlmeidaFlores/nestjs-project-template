import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/disability-retirement-planning-grant-time-accelerator.entity';
import type { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

export abstract class DisabilityRetirementPlanningGrantTimeAcceleratorCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantTimeAccelerator(
    props: DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningGrantTimeAccelerator(
    id: DisabilityRetirementPlanningGrantTimeAcceleratorId,
    props: DisabilityRetirementPlanningGrantTimeAcceleratorEntity,
  ): TransactionType;
}
