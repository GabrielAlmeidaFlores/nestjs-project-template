import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/rural-or-hybrid-retirement-rejection-work-period-earnings-history.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/value-object/rural-or-hybrid-retirement-rejection-work-period-earnings-history-id.value-object';

export abstract class RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionWorkPeriodEarningsHistory(
    props: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionWorkPeriodEarningsHistory(
    id: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryId,
  ): TransactionType;
}
