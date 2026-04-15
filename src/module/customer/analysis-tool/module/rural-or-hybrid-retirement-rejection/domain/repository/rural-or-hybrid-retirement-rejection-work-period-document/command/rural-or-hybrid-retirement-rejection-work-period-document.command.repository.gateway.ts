import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/rural-or-hybrid-retirement-rejection-work-period-document.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/value-object/rural-or-hybrid-retirement-rejection-work-period-document-id.value-object';

export abstract class RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionWorkPeriodDocument(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionWorkPeriodDocument(
    id: RuralOrHybridRetirementRejectionWorkPeriodDocumentId,
  ): TransactionType;
}
