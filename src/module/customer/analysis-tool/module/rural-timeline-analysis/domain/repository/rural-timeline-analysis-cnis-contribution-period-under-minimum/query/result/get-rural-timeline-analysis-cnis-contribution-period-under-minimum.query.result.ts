import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult extends BaseBuildableObject {
  public readonly contributionDate: Date;
  public readonly contributionAmount: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult.name;
}
