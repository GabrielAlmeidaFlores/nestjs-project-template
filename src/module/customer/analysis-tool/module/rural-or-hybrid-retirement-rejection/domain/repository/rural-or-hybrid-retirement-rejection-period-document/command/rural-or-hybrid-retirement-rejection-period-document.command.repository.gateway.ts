import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/rural-or-hybrid-retirement-rejection-period-document.entity';
import type { RuralOrHybridRetirementRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/value-object/rural-or-hybrid-retirement-rejection-period-document-id.value-object';

export abstract class RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionPeriodDocument(
    props: RuralOrHybridRetirementRejectionPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionPeriodDocument(
    id: RuralOrHybridRetirementRejectionPeriodDocumentId,
  ): TransactionType;
}
