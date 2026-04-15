import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/rural-or-hybrid-retirement-rejection-work-period-document-analysis.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/value-object/rural-or-hybrid-retirement-rejection-work-period-document-analysis-id.value-object';

export abstract class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId,
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
    id: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisId,
  ): TransactionType;
}
