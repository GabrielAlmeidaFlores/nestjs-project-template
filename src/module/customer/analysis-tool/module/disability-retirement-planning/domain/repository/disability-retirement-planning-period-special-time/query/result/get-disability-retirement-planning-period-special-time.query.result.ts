import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time-document/query/result/get-disability-retirement-planning-period-special-time-document.query.result';

export class GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly documents: GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult[];

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeQueryResult.name;
}
