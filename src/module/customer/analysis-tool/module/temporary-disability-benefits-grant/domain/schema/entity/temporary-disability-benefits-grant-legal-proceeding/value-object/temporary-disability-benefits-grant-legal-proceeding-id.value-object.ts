import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantLegalProceedingId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantLegalProceedingId.name;
}
