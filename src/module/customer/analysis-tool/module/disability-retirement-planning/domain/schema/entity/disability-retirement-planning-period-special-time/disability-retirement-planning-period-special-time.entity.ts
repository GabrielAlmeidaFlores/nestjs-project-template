import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';

import type { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import type { DisabilityRetirementPlanningPeriodSpecialTimeEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity.props.interface';

export class DisabilityRetirementPlanningPeriodSpecialTimeEntity extends BaseEntity<DisabilityRetirementPlanningPeriodSpecialTimeId> {
  public readonly disabilityRetirementPlanningPeriod: DisabilityRetirementPlanningPeriodEntity;
  public readonly startDate: Date;
  public readonly endDate: Date | null;

  protected readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningPeriodSpecialTimeEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningPeriodSpecialTimeId, props);
    this.disabilityRetirementPlanningPeriod =
      props.disabilityRetirementPlanningPeriod;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
  }
}
