import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/rural-or-hybrid-retirement-analysis-period.entity';
import type { RuralOrHybridRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/value-object/rural-or-hybrid-retirement-analysis-period-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisPeriodCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisPeriod(
    props: RuralOrHybridRetirementAnalysisPeriodEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisPeriod(
    id: RuralOrHybridRetirementAnalysisPeriodId,
    props: RuralOrHybridRetirementAnalysisPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisPeriod(
    id: RuralOrHybridRetirementAnalysisPeriodId,
  ): TransactionType;
}
