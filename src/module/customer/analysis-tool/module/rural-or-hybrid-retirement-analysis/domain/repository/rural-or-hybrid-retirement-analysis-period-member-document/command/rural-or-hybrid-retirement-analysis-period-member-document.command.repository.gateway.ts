import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/rural-or-hybrid-retirement-analysis-period-member-document.entity';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/value-object/rural-or-hybrid-retirement-analysis-period-member-document-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisPeriodMemberDocument(
    props: RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisPeriodMemberDocument(
    id: RuralOrHybridRetirementAnalysisPeriodMemberDocumentId,
  ): TransactionType;
}
