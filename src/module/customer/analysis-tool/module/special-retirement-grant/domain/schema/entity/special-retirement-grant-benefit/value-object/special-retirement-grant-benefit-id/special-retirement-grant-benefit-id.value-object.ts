import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantBenefitId extends Guid {
  protected override readonly _type = SpecialRetirementGrantBenefitId.name;
}
