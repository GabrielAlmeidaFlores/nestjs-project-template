import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementRejectionInssBenefitId extends Guid {
  protected override readonly _type =
    SpecialRetirementRejectionInssBenefitId.name;
}
