import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CreditPackId extends Guid {
  protected override readonly _type = CreditPackId.name;
}
