import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export class GetRuralTimelineAnalysisPeriodResidenceQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodResidenceId;
  public readonly city: string;
  public readonly stateCode: StateCodeEnum;
  public readonly distanceToPropertyKm: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodResidenceQueryResult.name;
}
