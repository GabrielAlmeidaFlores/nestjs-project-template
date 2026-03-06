import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import type { GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability-document/query/result/get-disability-retirement-planning-period-disability-document.query.result';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

export class GetDisabilityRetirementPlanningPeriodDisabilityQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly disabilityDegree: RetirementPlanningDisabilityDegreeEnum;
  public readonly disabilityCategory: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum;
  public readonly cidTenId: string | null;
  public readonly disabilityType: RetirementPlanningDisabilityTimeTypeEnum;
  public readonly disabilityDescription: string;
  public readonly activityImpact: string;
  public readonly documents: GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityQueryResult.name;
}
