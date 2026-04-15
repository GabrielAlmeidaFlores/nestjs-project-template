import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';

export abstract class RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionWorkPeriod(
    props: RuralOrHybridRetirementRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionWorkPeriod(
    id: RuralOrHybridRetirementRejectionWorkPeriodId,
    props: RuralOrHybridRetirementRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionWorkPeriod(
    id: RuralOrHybridRetirementRejectionWorkPeriodId,
  ): TransactionType;
}
