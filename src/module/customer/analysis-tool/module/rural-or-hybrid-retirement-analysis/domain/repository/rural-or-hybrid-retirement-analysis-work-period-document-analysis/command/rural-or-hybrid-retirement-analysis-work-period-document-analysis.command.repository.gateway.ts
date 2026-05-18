import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/rural-or-hybrid-retirement-analysis-work-period-document-analysis.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/value-object/rural-or-hybrid-retirement-analysis-work-period-document-analysis-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId,
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisId,
  ): TransactionType;
}
