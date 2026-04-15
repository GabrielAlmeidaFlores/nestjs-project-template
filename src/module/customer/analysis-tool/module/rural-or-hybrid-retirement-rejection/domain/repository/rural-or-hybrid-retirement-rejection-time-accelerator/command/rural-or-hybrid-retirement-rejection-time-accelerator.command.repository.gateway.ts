import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/rural-or-hybrid-retirement-rejection-time-accelerator.entity';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/value-object/rural-or-hybrid-retirement-rejection-time-accelerator-id.value-object';

export abstract class RuralOrHybridRetirementRejectionTimeAcceleratorCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionTimeAccelerator(
    props: RuralOrHybridRetirementRejectionTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionTimeAccelerator(
    id: RuralOrHybridRetirementRejectionTimeAcceleratorId,
    props: RuralOrHybridRetirementRejectionTimeAcceleratorEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionTimeAccelerator(
    id: RuralOrHybridRetirementRejectionTimeAcceleratorId,
  ): TransactionType;
}
