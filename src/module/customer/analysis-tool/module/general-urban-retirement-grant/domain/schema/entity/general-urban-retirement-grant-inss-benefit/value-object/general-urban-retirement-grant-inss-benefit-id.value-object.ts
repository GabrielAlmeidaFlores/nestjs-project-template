import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantInssBenefitId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementGrantInssBenefitId.name;
}
