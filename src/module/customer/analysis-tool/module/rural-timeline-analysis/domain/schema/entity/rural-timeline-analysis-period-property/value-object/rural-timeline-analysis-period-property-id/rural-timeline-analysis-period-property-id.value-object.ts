import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisPeriodPropertyId extends Guid {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodPropertyId.name;
}
