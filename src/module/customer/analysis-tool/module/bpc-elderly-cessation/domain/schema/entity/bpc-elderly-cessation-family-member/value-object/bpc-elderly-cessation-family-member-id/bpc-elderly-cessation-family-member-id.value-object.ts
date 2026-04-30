import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyCessationFamilyMemberId extends Guid {
  protected override readonly _type = BpcElderlyCessationFamilyMemberId.name;
}
