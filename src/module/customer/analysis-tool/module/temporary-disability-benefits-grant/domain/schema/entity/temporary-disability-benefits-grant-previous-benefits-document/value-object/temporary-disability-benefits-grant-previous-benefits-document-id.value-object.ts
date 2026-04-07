import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsDocumentId.name;
}
