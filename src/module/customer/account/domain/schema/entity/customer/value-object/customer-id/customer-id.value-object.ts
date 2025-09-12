import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CustomerId extends Guid {
  protected override readonly _type = CustomerId.name;
}
