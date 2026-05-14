import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantFamilyMemberDocumentId extends Guid {
  protected override readonly _type =
    BpcDisabilityGrantFamilyMemberDocumentId.name;
}
