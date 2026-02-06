import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisId extends Guid {
  protected override readonly _type = RuralTimelineAnalysisId.name;
}
