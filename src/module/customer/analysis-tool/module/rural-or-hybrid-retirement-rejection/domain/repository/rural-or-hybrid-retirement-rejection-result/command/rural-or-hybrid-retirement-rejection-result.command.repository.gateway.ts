import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';

export abstract class RuralOrHybridRetirementRejectionResultCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionResult(
    props: RuralOrHybridRetirementRejectionResultEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionResult(
    props: RuralOrHybridRetirementRejectionResultEntity,
  ): TransactionType;
}
