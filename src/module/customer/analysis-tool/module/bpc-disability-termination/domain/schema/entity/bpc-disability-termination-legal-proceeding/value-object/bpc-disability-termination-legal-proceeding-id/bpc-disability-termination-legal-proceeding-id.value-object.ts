import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationLegalProceedingId extends Guid {
  protected override readonly _type =
    BpcDisabilityTerminationLegalProceedingId.name;
}
