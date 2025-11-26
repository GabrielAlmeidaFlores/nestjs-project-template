import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class PaymentPlanEnablePaidResourceId extends Guid {
  protected override readonly _type = PaymentPlanEnablePaidResourceId.name;
}
