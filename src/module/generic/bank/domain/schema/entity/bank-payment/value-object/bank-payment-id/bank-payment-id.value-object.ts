import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BankPaymentId extends Guid {
  protected override readonly _type = BankPaymentId.name;
}
