import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/rural-or-hybrid-retirement-analysis-work-period.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisWorkPeriodCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisWorkPeriod(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisWorkPeriod(
    id: RuralOrHybridRetirementAnalysisWorkPeriodId,
    props: RuralOrHybridRetirementAnalysisWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisWorkPeriod(
    id: RuralOrHybridRetirementAnalysisWorkPeriodId,
  ): TransactionType;
}
