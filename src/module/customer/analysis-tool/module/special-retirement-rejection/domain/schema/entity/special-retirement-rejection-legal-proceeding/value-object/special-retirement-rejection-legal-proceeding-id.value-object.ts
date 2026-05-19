import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementRejectionLegalProceedingId extends Guid {
  protected override readonly _type =
    SpecialRetirementRejectionLegalProceedingId.name;
}
