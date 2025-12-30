import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class CreateBillingInputModel extends BaseBuildableObject {
  public readonly customerId: string;
  public readonly value: DecimalValue;
  public readonly dueDate: Date;
  public readonly description: string;
  public readonly externalReference: string;
  public readonly installmentCount?: number;

  protected override readonly _type = CreateBillingInputModel.name;
}
