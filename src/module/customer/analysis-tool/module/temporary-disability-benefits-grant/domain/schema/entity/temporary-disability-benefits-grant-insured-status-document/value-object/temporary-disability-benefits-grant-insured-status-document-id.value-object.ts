import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusDocumentId.name;
}
