import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayGrantPeriodId extends Guid {
  protected override readonly _type = MaternityPayGrantPeriodId.name;
}
