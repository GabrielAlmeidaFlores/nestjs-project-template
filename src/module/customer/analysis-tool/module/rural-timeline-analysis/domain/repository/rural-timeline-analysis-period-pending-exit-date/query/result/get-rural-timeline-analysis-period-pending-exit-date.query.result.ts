import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult extends BaseBuildableObject {
  public readonly pendingDate: Date;
  public readonly pendingAmount: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult.name;
}
