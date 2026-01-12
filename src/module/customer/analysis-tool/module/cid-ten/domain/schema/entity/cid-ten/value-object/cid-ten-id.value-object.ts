import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class CidTenId extends Guid {
  protected override readonly _type = CidTenId.name;
}
