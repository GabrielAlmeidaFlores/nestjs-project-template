import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.entity';
import type { RuralOrHybridRetirementRejectionPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/value-object/rural-or-hybrid-retirement-rejection-period-id.value-object';

export abstract class RuralOrHybridRetirementRejectionPeriodCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionPeriod(
    props: RuralOrHybridRetirementRejectionPeriodEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionPeriod(
    id: RuralOrHybridRetirementRejectionPeriodId,
    props: RuralOrHybridRetirementRejectionPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionPeriod(
    id: RuralOrHybridRetirementRejectionPeriodId,
  ): TransactionType;
}
