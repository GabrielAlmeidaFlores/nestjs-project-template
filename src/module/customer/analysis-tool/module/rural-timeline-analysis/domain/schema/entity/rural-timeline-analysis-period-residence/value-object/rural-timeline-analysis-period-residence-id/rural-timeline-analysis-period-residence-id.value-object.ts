import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisPeriodResidenceId extends Guid {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodResidenceId.name;
}
