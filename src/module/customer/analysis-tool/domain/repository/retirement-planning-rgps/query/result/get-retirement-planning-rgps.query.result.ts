import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';

export class GetRetirementPlanningRgpsQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsId;
  public readonly cnisDocument: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetRetirementPlanningRgpsQueryResult.name;
}
