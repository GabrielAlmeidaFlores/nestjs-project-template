import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantDocumentId.name;
}
