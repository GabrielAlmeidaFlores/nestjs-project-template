import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantFamilyMemberId extends Guid {
  protected override readonly _type = BpcDisabilityGrantFamilyMemberId.name;
}
