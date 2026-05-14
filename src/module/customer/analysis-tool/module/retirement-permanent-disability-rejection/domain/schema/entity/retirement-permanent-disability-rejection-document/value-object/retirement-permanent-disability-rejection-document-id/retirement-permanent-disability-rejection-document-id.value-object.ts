import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRejectionDocumentId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionDocumentId.name;
}
