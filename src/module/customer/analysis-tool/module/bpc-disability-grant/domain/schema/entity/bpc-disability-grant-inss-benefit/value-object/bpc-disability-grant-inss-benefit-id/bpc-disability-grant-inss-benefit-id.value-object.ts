import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantInssBenefitId extends Guid {
  protected override readonly _type = BpcDisabilityGrantInssBenefitId.name;
}
