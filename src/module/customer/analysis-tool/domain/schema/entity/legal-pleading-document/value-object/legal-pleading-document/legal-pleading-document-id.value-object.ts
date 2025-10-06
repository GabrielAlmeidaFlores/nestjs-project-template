import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalPleadingDocumentId extends Guid {
  protected override readonly _type = LegalPleadingDocumentId.name;
}
