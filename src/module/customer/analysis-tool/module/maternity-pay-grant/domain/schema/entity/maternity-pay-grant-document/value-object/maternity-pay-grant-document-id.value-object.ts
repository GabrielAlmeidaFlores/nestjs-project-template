import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MaternityPayGrantDocumentId extends Guid {
  protected override readonly _type = MaternityPayGrantDocumentId.name;
}
