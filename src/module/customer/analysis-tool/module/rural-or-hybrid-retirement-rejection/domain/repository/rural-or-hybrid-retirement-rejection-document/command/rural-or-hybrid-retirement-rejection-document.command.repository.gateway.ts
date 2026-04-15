import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/rural-or-hybrid-retirement-rejection-document.entity';
import type { RuralOrHybridRetirementRejectionDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/value-object/rural-or-hybrid-retirement-rejection-document-id.value-object';

export abstract class RuralOrHybridRetirementRejectionDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionDocument(
    props: RuralOrHybridRetirementRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionDocument(
    id: RuralOrHybridRetirementRejectionDocumentId,
  ): TransactionType;
}
