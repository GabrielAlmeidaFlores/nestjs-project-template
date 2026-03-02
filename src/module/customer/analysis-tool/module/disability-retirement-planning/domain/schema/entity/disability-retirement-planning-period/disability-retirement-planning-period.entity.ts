import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { DisabilityRetirementPlanningPeriodId } from './value-object/disability-retirement-planning-period-id.value-object';

import type { DisabilityRetirementPlanningPeriodEntityPropsInterface } from './disability-retirement-planning-period.entity.props.interface';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';

export class DisabilityRetirementPlanningPeriodEntity extends BaseEntity<DisabilityRetirementPlanningPeriodId> {
  protected readonly _type = DisabilityRetirementPlanningPeriodEntity.name;

  public readonly disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly jobPosition: string;
  public readonly careerName: string;
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;

  public constructor(
    props: DisabilityRetirementPlanningPeriodEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningPeriodId, props);
    this.disabilityRetirementPlanning = props.disabilityRetirementPlanning;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.jobPosition = props.jobPosition;
    this.careerName = props.careerName;
    this.serviceType = props.serviceType;
    this.department = props.department;
  }
}
