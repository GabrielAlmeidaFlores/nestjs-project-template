import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelinePeriodPropertyId extends Guid {
  protected override readonly _type = RuralTimelinePeriodPropertyId.name;
}
