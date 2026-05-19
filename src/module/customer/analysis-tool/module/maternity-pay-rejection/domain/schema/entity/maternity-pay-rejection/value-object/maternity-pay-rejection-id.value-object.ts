import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayRejectionId extends Guid {
  protected override readonly _type = MaternityPayRejectionId.name;
}
