import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AdminId extends Guid {
  protected override readonly _type = AdminId.name;
}
