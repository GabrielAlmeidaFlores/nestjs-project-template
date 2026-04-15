import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.entity';
import type { RuralOrHybridRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/value-object/rural-or-hybrid-retirement-rejection-legal-proceeding-id.value-object';

export abstract class RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionLegalProceeding(
    props: RuralOrHybridRetirementRejectionLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionLegalProceeding(
    id: RuralOrHybridRetirementRejectionLegalProceedingId,
  ): TransactionType;
}
