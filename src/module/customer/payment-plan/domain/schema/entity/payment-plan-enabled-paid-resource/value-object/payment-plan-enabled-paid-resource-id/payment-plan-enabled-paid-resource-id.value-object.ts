import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PaymentPlanEnabledPaidResourceId extends Guid {
  protected override readonly _type = PaymentPlanEnabledPaidResourceId.name;
}
