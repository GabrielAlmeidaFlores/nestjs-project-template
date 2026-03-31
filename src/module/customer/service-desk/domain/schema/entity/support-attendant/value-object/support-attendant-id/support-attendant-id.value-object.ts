import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SupportAttendantId extends Guid {
  protected override readonly _type = SupportAttendantId.name;
}
