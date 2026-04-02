import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SystemActivityId extends Guid {
  protected override readonly _type = SystemActivityId.name;
}
