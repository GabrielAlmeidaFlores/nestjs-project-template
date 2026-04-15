import type { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/model/transaction';
import type { RuralOrHybridRetirementRejectionEntity } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';

export type TransactionType = (executor: unknown) => Promise<void>;

export abstract class RuralOrHybridRetirementRejectionCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejection(
    entity: RuralOrHybridRetirementRejectionEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejection(
    id: RuralOrHybridRetirementRejectionId,
    entity: RuralOrHybridRetirementRejectionEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejection(
    id: RuralOrHybridRetirementRejectionId,
  ): TransactionType;
}
