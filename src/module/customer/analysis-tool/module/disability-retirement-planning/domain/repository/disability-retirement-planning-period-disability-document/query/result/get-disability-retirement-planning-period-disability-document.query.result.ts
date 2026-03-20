import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/enum/disability-retirement-planning-period-disability-document-type.enum';

export class GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningPeriodDisabilityDocumentTypeEnum;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult.name;
}
