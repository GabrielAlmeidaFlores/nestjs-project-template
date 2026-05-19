import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantResultId extends Guid {
  protected override readonly _type = BpcDisabilityGrantResultId.name;
}
