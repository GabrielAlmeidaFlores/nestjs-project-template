import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationInssBenefitId extends Guid {
  protected override readonly _type =
    BpcDisabilityTerminationInssBenefitId.name;
}
