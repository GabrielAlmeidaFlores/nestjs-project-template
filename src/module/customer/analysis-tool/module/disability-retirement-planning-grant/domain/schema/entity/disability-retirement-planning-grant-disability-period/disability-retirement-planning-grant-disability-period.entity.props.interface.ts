import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-category.enum';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

export interface DisabilityRetirementPlanningGrantDisabilityPeriodEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantDisabilityPeriodId> {
  disabilityDegree: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;
  disabilityCategory: DisabilityRetirementPlanningGrantDisabilityCategoryEnum;
  disabilityDescription: string;
  dailyImpact: string;
  startDate: Date;
  endDate?: Date | null;
  cidTenId?: string | null;
  disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;
}
