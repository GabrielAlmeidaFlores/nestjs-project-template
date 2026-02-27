import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';

export abstract class DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningPeriodSpecialTime(
    props: DisabilityRetirementPlanningPeriodSpecialTimeEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningPeriodSpecialTime(
    id: DisabilityRetirementPlanningPeriodSpecialTimeId,
  ): TransactionType;
}
