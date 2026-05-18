import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';

export class GetDisabilityRetirementPlanningRemunerationListQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityRetirementPlanningRemunerationId;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRemunerationListQueryResult.name;
}
