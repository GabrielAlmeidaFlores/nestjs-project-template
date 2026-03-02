import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningPeriodDisabilityId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/value-object/disability-retirement-planning-period-disability-id.value-object';

import type { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import type { DisabilityRetirementPlanningPeriodDisabilityEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity.props.interface';
import type { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

export class DisabilityRetirementPlanningPeriodDisabilityEntity extends BaseEntity<DisabilityRetirementPlanningPeriodDisabilityId> {
  protected readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityEntity.name;

  public readonly disabilityRetirementPlanningPeriod: DisabilityRetirementPlanningPeriodEntity;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum;
  public readonly disabilityCategory: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;
  public readonly cidTenId: string | null;
  public readonly disabilityType: RetirementPlanningDisabilityTimeTypeEnum;
  public readonly disabilityDescription: string;
  public readonly activityImpact: string;

  public constructor(
    props: DisabilityRetirementPlanningPeriodDisabilityEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningPeriodDisabilityId, props);
    this.disabilityRetirementPlanningPeriod =
      props.disabilityRetirementPlanningPeriod;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.disabilityDegree = props.disabilityDegree;
    this.disabilityCategory = props.disabilityCategory;
    this.cidTenId = props.cidTenId ?? null;
    this.disabilityType = props.disabilityType;
    this.disabilityDescription = props.disabilityDescription;
    this.activityImpact = props.activityImpact;
  }
}
