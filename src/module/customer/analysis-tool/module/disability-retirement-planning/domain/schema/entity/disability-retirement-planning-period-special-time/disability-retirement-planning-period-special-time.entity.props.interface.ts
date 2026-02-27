import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import type { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';

export interface DisabilityRetirementPlanningPeriodSpecialTimeEntityPropsInterface
  extends BaseEntityPropsInterface<DisabilityRetirementPlanningPeriodSpecialTimeId> {
  disabilityRetirementPlanningPeriod: DisabilityRetirementPlanningPeriodEntity;
  startDate: Date;
  endDate?: Date | null;
}
