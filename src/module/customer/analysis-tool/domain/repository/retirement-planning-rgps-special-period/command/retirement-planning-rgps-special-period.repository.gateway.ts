import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRgpsSpecialPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.entity';
import type { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';

export abstract class RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway {
  public abstract createRetirementPlanningRgpsSpecialPeriod(
    props: RetirementPlanningRgpsSpecialPeriodEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRgpsSpecialPeriod(
    id: RetirementPlanningRgpsSpecialPeriodId,
    props: RetirementPlanningRgpsSpecialPeriodEntity,
  ): TransactionType;
}
