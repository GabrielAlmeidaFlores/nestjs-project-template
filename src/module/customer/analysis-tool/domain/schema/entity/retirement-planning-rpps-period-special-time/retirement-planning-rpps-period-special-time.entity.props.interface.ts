import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';
import type { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import type { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';

export interface RetirementPlanningRppsPeriodSpecialTimeEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsPeriodSpecialTimeId> {
  type: RetirementPlanningPeriodSpecialTimeTypeEnum;
  startDate: Date;
  endDate: Date;
  retirementPlanningRppsPeriod?: RetirementPlanningRppsPeriodEntity | null;
}
