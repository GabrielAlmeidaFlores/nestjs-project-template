import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';

export class GetRetirementPlanningRgpsTimeAcceleratorQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsTimeAcceleratorId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly timeType: string;
  public readonly name: string | null;
  public readonly institution: string | null;
  public readonly periodStart: Date | null;
  public readonly periodEnd: Date | null;
  public readonly affectsQualifyingPeriod: boolean | null;
  public readonly timeGained: string | null;
  public readonly viability: string | null;
  public readonly technicalNote: string | null;

  protected override readonly _type =
    GetRetirementPlanningRgpsTimeAcceleratorQueryResult.name;
}
