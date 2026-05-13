import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantDocumentId extends Guid {
  protected override readonly _type = BpcDisabilityGrantDocumentId.name;
}
