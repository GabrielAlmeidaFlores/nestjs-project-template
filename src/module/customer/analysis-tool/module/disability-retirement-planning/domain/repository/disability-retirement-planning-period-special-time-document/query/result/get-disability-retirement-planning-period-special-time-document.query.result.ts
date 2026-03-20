import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/enum/disability-retirement-planning-period-special-time-document-type.enum';

export class GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeEnum;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult.name;
}
