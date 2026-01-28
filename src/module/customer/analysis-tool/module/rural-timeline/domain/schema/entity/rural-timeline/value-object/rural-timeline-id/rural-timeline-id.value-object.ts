import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineId extends Guid {
  protected override readonly _type = RuralTimelineId.name;
}
