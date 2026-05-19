import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-pendency-reason.enum';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
import type { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

export class GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult extends BaseBuildableObject {
  public readonly retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId;
  public readonly bondOrigin: string;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly category: string;
  public readonly competenceBelowTheMinimum: boolean;
  public readonly pendencyReason: RetirementPermanentDisabilityRevisionWorkPeriodsPendencyReasonEnum | null;
  public readonly periodConsideration: RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum | null;
  public readonly contributionAverage: DecimalValue | null;
  public readonly status: boolean;
  public readonly gracePeriod: number;
  public readonly retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult.name;
}
