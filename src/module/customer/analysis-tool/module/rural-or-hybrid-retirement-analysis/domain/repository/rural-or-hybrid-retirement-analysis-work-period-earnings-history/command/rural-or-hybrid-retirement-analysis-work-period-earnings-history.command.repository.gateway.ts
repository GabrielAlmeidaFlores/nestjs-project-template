import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/rural-or-hybrid-retirement-analysis-work-period-earnings-history.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/value-object/rural-or-hybrid-retirement-analysis-work-period-earnings-history-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistory(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistory(
    id: RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryId,
  ): TransactionType;
}
