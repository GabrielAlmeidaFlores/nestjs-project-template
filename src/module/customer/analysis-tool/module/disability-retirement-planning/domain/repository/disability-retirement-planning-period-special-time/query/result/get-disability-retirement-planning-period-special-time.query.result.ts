import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time-document/query/result/get-disability-retirement-planning-period-special-time-document.query.result';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';

export class GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly specialPeriodType: RetirementPlanningDisabilityTimeTypeEnum;
  public readonly documents: GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult.name;
}
