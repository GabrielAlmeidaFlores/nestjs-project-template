import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId.name;
}
