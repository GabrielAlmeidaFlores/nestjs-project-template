import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity.props.interface';
import type { DisabilityRetirementPlanningGrantDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-category.enum';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';

export class DisabilityRetirementPlanningGrantDisabilityPeriodEntity extends BaseEntity<DisabilityRetirementPlanningGrantDisabilityPeriodId> {
  public readonly disabilityDegree: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;
  public readonly disabilityCategory: DisabilityRetirementPlanningGrantDisabilityCategoryEnum;
  public readonly disabilityDescription: string;
  public readonly dailyImpact: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly cidTenId: string | null;
  public readonly disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;

  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodEntity.name;

  public constructor(
    props: DisabilityRetirementPlanningGrantDisabilityPeriodEntityPropsInterface,
  ) {
    super(DisabilityRetirementPlanningGrantDisabilityPeriodId, props);
    this.disabilityDegree = props.disabilityDegree;
    this.disabilityCategory = props.disabilityCategory;
    this.disabilityDescription = props.disabilityDescription;
    this.dailyImpact = props.dailyImpact;
    this.startDate = props.startDate;
    this.endDate = props.endDate ?? null;
    this.cidTenId = props.cidTenId ?? null;
    this.disabilityRetirementPlanningGrantId =
      props.disabilityRetirementPlanningGrantId;
  }
}
