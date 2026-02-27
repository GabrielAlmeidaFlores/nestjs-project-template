import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import type { DisabilityRetirementPlanningPeriodDisabilityId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/value-object/disability-retirement-planning-period-disability-id.value-object';

export interface DisabilityRetirementPlanningPeriodDisabilityEntityPropsInterface
  extends BaseEntityPropsInterface<DisabilityRetirementPlanningPeriodDisabilityId> {
  disabilityRetirementPlanningPeriod: DisabilityRetirementPlanningPeriodEntity;
  startDate: Date;
  endDate?: Date | null;
  disabilityDegree: RetirementPlanningDisabilityDegreeEnum;
  cidTenId?: string | null;
  disabilityType: RetirementPlanningDisabilityTimeTypeEnum;
  disabilityDescription: string;
  activityImpact: string;
}
