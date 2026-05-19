import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningGrantDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-category.enum';
import type { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

export class GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningGrantDisabilityPeriodId;
  public readonly disabilityDegree: DisabilityRetirementPlanningGrantDisabilityDegreeEnum;
  public readonly disabilityCategory: DisabilityRetirementPlanningGrantDisabilityCategoryEnum;
  public readonly disabilityDescription: string;
  public readonly dailyImpact: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly cidTenId: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult.name;
}
