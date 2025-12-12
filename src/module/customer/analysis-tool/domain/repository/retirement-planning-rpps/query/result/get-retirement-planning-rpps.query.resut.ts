import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';

export class GetRetirementPlanningRppsQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsId;
  public readonly ctcDocument: string | null;
  public readonly careerStartDate: Date;
  public readonly publicServiceStartDate: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type = GetRetirementPlanningRppsQueryResult.name;
}
