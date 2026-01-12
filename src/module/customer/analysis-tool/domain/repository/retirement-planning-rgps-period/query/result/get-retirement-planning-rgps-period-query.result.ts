import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/enum/reason-pendency.enum';

export class GetRetirementPlanningRgpsPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsPeriodId;

  public readonly periodName: string | null;

  public readonly periodStart: Date | null;

  public readonly periodEnd: Date | null;

  public readonly category: string | null;

  public readonly isPendency: boolean | null;

  public readonly competenceBelowTheMinimum: boolean | null;

  public readonly contributionAverage: DecimalValue | null;

  public readonly typeOfContribution: string | null;

  public readonly status: boolean | null;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly deletedAt: Date | null;

  public readonly reasonPendency: ReasonPendencyEnum | null;

  protected override readonly _type =
    GetRetirementPlanningRgpsPeriodQueryResult.name;
}
