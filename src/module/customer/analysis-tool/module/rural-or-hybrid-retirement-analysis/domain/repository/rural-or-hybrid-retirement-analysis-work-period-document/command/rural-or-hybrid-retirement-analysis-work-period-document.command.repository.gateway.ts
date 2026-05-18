import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/rural-or-hybrid-retirement-analysis-work-period-document.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/value-object/rural-or-hybrid-retirement-analysis-work-period-document-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisWorkPeriodDocument(
    props: RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisWorkPeriodDocument(
    id: RuralOrHybridRetirementAnalysisWorkPeriodDocumentId,
  ): TransactionType;
}
