import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayRejectionWorkPeriodId extends Guid {
  protected override readonly _type = MaternityPayRejectionWorkPeriodId.name;
}
