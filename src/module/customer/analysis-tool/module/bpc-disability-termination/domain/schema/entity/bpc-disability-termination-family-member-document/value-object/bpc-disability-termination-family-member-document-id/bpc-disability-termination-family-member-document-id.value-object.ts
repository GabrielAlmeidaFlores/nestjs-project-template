import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationFamilyMemberDocumentId extends Guid {
  protected override readonly _type =
    BpcDisabilityTerminationFamilyMemberDocumentId.name;
}
