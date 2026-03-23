import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateBankTransferId extends Guid {
  protected override readonly _type = AffiliateBankTransferId.name;
}
