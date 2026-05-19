import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantPeriodDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodDocumentId.name;
}
