import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';

export class GetRetirementPlanningRgpsSpecialPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsSpecialPeriodId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly response: string;

  protected override readonly _type =
    GetRetirementPlanningRgpsSpecialPeriodQueryResult.name;
}
