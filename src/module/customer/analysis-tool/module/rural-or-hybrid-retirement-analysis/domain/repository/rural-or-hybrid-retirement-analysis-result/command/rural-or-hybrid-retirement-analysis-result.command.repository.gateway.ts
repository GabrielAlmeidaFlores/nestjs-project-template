import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';

export abstract class RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisResult(
    props: RuralOrHybridRetirementAnalysisResultEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisResult(
    props: RuralOrHybridRetirementAnalysisResultEntity,
  ): TransactionType;
}
