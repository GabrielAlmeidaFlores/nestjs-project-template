import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.entity';
import type { RuralOrHybridRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/value-object/rural-or-hybrid-retirement-analysis-document-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisDocument(
    props: RuralOrHybridRetirementAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisDocument(
    id: RuralOrHybridRetirementAnalysisDocumentId,
  ): TransactionType;
}
