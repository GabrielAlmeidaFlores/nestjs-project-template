import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayRejectionResultId extends Guid {
  protected override readonly _type = MaternityPayRejectionResultId.name;
}
