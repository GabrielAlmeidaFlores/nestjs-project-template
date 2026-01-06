import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';

export class GetRetirementPlanningRgpsPeriodQueryResultWithRelations extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsPeriodId;

  public readonly periodName: string | null;

  public readonly periodStart: Date | null;

  public readonly periodEnd: Date | null;

  public readonly category: string | null;

  public readonly isPendency: boolean | null;

  public readonly competenceBelowTheMinimum: boolean | null;

  public readonly contributionAverage: number | null;

  public readonly typeOfContribution: string | null;

  public readonly status: boolean | null;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly deletedAt: Date | null;

  public readonly reasonPendency: string | null;

  public readonly retirementPlanningRgps: RetirementPlanningRgpsEntity | null;

  protected override readonly _type =
    GetRetirementPlanningRgpsPeriodQueryResultWithRelations.name;
}
