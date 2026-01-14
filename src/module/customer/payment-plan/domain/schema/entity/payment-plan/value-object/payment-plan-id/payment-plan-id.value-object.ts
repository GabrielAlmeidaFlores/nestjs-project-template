import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PaymentPlanId extends Guid {
  protected override readonly _type = PaymentPlanId.name;
}
