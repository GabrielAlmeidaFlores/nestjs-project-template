import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AffiliateCustomerPaymentPlanId extends Guid {
  protected override readonly _type = AffiliateCustomerPaymentPlanId.name;
}
