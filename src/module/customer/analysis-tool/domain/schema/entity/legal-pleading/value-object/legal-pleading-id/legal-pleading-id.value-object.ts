import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalPleadingId extends Guid {
  protected override readonly _type = LegalPleadingId.name;
}
