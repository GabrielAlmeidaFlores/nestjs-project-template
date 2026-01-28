import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineDocumentId extends Guid {
  protected override readonly _type = RuralTimelineDocumentId.name;
}
