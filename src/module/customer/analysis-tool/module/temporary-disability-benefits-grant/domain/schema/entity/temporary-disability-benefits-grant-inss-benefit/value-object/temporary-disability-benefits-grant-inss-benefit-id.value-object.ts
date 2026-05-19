import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantInssBenefitId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInssBenefitId.name;
}
