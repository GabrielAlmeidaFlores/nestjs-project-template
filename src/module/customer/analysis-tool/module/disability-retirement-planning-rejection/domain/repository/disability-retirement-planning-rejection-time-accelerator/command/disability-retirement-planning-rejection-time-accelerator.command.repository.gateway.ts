import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/disability-retirement-planning-rejection-time-accelerator.entity';
import type { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

export abstract class DisabilityRetirementPlanningRejectionTimeAcceleratorCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionTimeAccelerator(
    props: DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningRejectionTimeAccelerator(
    id: DisabilityRetirementPlanningRejectionTimeAcceleratorId,
    props: DisabilityRetirementPlanningRejectionTimeAcceleratorEntity,
  ): TransactionType;
}
