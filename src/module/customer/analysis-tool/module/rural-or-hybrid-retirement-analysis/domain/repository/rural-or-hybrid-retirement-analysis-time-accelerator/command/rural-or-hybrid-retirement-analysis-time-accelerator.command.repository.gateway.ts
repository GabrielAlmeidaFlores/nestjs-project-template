import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/rural-or-hybrid-retirement-analysis-time-accelerator.entity';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/value-object/rural-or-hybrid-retirement-analysis-time-accelerator-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisTimeAcceleratorCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisTimeAccelerator(
    props: RuralOrHybridRetirementAnalysisTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisTimeAccelerator(
    id: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
    props: RuralOrHybridRetirementAnalysisTimeAcceleratorEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisTimeAccelerator(
    id: RuralOrHybridRetirementAnalysisTimeAcceleratorId,
  ): TransactionType;
}
