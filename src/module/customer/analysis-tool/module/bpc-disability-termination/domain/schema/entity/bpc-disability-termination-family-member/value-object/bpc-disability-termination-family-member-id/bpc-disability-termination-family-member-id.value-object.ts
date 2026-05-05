import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationFamilyMemberId extends Guid {
  protected override readonly _type =
    BpcDisabilityTerminationFamilyMemberId.name;
}
