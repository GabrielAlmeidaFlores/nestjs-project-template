import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusDocumentId.name;
}
