import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRevisionDocumentId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDocumentId.name;
}
