import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CustomerAddressId extends Guid {
  protected override readonly _type = CustomerAddressId.name;
}
