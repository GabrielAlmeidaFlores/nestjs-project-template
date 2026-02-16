import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalPleadingAddressId extends Guid {
  protected override readonly _type = LegalPleadingAddressId.name;
}
