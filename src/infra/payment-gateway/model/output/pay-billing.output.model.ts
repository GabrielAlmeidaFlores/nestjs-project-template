import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class PayBillingOutputModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly value: DecimalValue;

  protected override readonly _type = PayBillingOutputModel.name;
}
