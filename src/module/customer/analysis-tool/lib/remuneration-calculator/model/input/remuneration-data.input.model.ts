import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class RemunerationDataInputModel extends BaseBuildableObject {
  public readonly remunerationAmount: DecimalValue;

  protected override readonly _type = RemunerationDataInputModel.name;
}
