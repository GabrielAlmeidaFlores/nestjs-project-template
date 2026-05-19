import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationResultId extends Guid {
  protected override readonly _type = BpcDisabilityTerminationResultId.name;
}
