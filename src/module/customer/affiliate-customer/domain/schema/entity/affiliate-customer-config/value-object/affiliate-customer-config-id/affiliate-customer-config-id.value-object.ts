import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateCustomerConfigId extends Guid {
  protected override readonly _type = AffiliateCustomerConfigId.name;
}
