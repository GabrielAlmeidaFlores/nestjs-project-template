import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyCessationInssBenefitId extends Guid {
  protected override readonly _type = BpcElderlyCessationInssBenefitId.name;
}
