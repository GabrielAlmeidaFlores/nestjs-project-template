import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisDocumentId extends Guid {
  protected override readonly _type = RuralTimelineAnalysisDocumentId.name;
}
