import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityDenialId extends Guid {
  protected override readonly _type = BpcDisabilityDenialId.name;
}
