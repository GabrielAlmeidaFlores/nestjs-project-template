import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityDenialResultId extends Guid {
  protected override readonly _type = BpcDisabilityDenialResultId.name;
}
