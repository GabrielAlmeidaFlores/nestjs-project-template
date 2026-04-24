import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';

export abstract class RuralOrHybridRetirementRejectionCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejection(
    props: RuralOrHybridRetirementRejectionEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejection(
    id: RuralOrHybridRetirementRejectionId,
    props: RuralOrHybridRetirementRejectionEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionResultId(
    id: RuralOrHybridRetirementRejectionId,
    resultId: RuralOrHybridRetirementRejectionResultId,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejection(
    id: RuralOrHybridRetirementRejectionId,
  ): TransactionType;
}
