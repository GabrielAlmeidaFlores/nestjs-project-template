import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationDocumentId extends Guid {
  protected override readonly _type = BpcDisabilityTerminationDocumentId.name;
}
