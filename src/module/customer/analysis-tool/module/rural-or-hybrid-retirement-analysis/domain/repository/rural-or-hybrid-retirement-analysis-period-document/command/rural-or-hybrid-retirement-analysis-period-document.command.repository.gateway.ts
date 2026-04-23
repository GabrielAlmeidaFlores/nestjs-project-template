import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/rural-or-hybrid-retirement-analysis-period-document.entity';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/value-object/rural-or-hybrid-retirement-analysis-period-document-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisPeriodDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisPeriodDocument(
    props: RuralOrHybridRetirementAnalysisPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisPeriodDocument(
    id: RuralOrHybridRetirementAnalysisPeriodDocumentId,
  ): TransactionType;
}
