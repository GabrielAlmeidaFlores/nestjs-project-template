import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyCessationFamilyMemberDocumentId extends Guid {
  protected override readonly _type =
    BpcElderlyCessationFamilyMemberDocumentId.name;
}
