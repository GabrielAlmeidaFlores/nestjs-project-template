import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CustomerTermsAcceptanceId extends Guid {
  protected override readonly _type = CustomerTermsAcceptanceId.name;
}
