import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BankTransferId extends Guid {
  protected override readonly _type = BankTransferId.name;
}
