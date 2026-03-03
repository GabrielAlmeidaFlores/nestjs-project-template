import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/value-object/retirement-planning-rgps-result-id.value-object';

export class GetRetirementPlanningRgpsResultQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsResultId;
  public readonly cnisDocument: string | null;
  public readonly compareCnisCtps: string | null;
  public readonly compareCnisCtpsRaw: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRgpsResultQueryResult.name;
}
