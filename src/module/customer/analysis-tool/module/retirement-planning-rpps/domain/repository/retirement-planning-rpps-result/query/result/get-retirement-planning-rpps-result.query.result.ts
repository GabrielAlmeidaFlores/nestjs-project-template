import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRppsResultId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-result/value-object/retirement-planning-rpps-result-id.value-object';

export class GetRetirementPlanningRppsResultQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsResultId;
  public readonly retirementPlanningRppsCompleteAnalysis: string | null;
  public readonly retirementPlanningRppsSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsResultQueryResult.name;
}
