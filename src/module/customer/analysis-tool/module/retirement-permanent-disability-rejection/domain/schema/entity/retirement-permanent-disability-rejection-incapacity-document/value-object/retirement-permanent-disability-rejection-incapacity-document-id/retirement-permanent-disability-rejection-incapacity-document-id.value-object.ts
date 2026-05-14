import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRejectionIncapacityDocumentId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityDocumentId.name;
}
