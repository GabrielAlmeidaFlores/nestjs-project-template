import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantId extends Guid {
  protected override readonly _type = BpcDisabilityGrantId.name;
}
