import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity.props.interface';
import { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';

export class DisabilityRetirementPlanningPeriodSpecialTimeEntity extends BaseEntity<DisabilityRetirementPlanningPeriodSpecialTimeId> {
  protected readonly _type = DisabilityRetirementPlanningPeriodSpecialTimeEntity.name;

  public readonly disabilityRetirementPlanningPeriod: DisabilityRetirementPlanningPeriodEntity;
  public readonly startDate: Date;
  public readonly endDate: Date | null;

  public constructor(props: DisabilityRetirementPlanningPeriodSpecialTimeEntityPropsInterface) {
    super(DisabilityRetirementPlanningPeriodSpecialTimeId, props);
    this.disabilityRetirementPlanningPeriod = props.disabilityRetirementPlanningPeriod;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
  }
}
