import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetDisabilityRetirementPlanningPeriodDisabilityQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability/query/result/get-disability-retirement-planning-period-disability.query.result';
import type { GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time/query/result/get-disability-retirement-planning-period-special-time.query.result';
import type { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';

export class GetDisabilityRetirementPlanningPeriodQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly jobPosition: string;
  public readonly careerName: string;
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly disabilities: GetDisabilityRetirementPlanningPeriodDisabilityQueryResult[];
  public readonly specialTimes: GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodQueryResult.name;
}
