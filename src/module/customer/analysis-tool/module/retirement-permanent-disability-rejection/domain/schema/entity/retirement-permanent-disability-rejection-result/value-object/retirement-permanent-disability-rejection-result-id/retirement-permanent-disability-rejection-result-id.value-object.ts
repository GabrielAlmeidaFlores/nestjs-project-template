import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRejectionResultId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionResultId.name;
}
