import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';

export class GetDisabilityRetirementPlanningDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;
  public readonly type: DisabilityRetirementPlanningDocumentTypeEnum;

  protected override readonly _type =
    GetDisabilityRetirementPlanningDocumentQueryResult.name;
}
