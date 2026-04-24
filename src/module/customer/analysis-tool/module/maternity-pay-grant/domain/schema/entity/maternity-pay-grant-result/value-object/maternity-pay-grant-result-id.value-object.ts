import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayGrantResultId extends Guid {
  protected override readonly _type = MaternityPayGrantResultId.name;
}
