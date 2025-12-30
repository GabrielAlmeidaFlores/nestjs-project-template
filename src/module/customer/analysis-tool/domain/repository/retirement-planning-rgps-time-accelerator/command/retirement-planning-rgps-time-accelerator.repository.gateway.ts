import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsTimeAcceleratorEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.entity';
import type { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';

export abstract class RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsTimeAccelerator(
    props: RetirementPlanningRgpsTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgpsTimeAccelerator(
    id: RetirementPlanningRgpsTimeAcceleratorId,
    props: RetirementPlanningRgpsTimeAcceleratorEntity,
  ): TransactionType;
}
