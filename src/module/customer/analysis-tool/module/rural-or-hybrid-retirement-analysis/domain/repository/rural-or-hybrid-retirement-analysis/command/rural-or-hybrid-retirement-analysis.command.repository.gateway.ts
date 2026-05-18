import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysis(
    props: RuralOrHybridRetirementAnalysisEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysis(
    id: RuralOrHybridRetirementAnalysisId,
    props: RuralOrHybridRetirementAnalysisEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisResultId(
    id: RuralOrHybridRetirementAnalysisId,
    resultId: RuralOrHybridRetirementAnalysisResultId,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysis(
    id: RuralOrHybridRetirementAnalysisId,
  ): TransactionType;
}
