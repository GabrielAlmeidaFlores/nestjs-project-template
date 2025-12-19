import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { CidTenEntity } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/cid-ten-entity';
import type { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-planning-rpps-period.entity';
import type { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import type { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';

export interface RetirementPlanningRppsPeriodDisabilityEntityPropsInterface
  extends BaseEntityPropsInterface<RetirementPlanningRppsPeriodDisabilityId> {
  type: RetirementPlanningDisabilityTimeTypeEnum;
  degree: RetirementPlanningDisabilityDegreeEnum;
  startDate: Date;
  endDate: Date;
  category: RetirementPlanningDisabilityCategoryEnum;
  description: string;
  dailyImpact: string;
  cidTen: CidTenEntity;
  retirementPlanningRppsPeriod: RetirementPlanningRppsPeriodEntity;
}
