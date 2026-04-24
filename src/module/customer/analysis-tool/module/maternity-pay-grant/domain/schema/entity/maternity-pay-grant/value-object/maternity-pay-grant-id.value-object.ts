import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayGrantId extends Guid {
  protected override readonly _type = MaternityPayGrantId.name;
}
