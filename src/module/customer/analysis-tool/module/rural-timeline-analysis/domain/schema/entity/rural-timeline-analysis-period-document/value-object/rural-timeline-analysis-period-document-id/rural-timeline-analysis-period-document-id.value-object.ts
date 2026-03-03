import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisPeriodDocumentId extends Guid {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodDocumentId.name;
}
