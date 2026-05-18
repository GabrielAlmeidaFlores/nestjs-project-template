import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantLegalProceedingId extends Guid {
  protected override readonly _type =
    SpecialRetirementGrantLegalProceedingId.name;
}
