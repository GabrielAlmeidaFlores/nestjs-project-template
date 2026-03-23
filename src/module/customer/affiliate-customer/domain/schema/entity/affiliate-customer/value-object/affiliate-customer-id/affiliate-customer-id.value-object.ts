import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateCustomerId extends Guid {
  protected override readonly _type = AffiliateCustomerId.name;
}
