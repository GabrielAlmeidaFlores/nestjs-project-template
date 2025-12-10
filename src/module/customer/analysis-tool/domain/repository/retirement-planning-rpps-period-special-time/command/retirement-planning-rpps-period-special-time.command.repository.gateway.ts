import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import type { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';

export abstract class RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway {
  public abstract createRetirementPlanningRppsPeriodSpecialTime(
    props: RetirementPlanningRppsPeriodSpecialTimeEntity,
  ): TransactionType;

  public abstract updateRetirementPlanningRppsPeriodSpecialTime(
    id: RetirementPlanningRppsPeriodSpecialTimeId,
    props: RetirementPlanningRppsPeriodSpecialTimeEntity,
  ): TransactionType;
}
