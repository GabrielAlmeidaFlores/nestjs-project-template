import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelinePeriodId extends Guid {
  protected override readonly _type = RuralTimelinePeriodId.name;
}
