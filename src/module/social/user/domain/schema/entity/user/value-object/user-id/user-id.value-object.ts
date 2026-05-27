import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class UserId extends Guid {
  protected override readonly _type = UserId.name;
}
