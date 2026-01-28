import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelinePeriodDocumentId extends Guid {
  protected override readonly _type = RuralTimelinePeriodDocumentId.name;
}
