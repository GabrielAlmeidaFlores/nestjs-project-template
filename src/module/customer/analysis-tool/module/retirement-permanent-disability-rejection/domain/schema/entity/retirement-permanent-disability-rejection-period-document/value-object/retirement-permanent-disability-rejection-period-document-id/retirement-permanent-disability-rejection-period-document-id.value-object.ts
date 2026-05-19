import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRejectionPeriodDocumentId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodDocumentId.name;
}
