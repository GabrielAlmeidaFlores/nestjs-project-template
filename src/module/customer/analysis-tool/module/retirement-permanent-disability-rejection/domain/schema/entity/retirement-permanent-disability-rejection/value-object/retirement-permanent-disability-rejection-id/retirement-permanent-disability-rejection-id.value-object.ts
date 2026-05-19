import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRejectionId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionId.name;
}
