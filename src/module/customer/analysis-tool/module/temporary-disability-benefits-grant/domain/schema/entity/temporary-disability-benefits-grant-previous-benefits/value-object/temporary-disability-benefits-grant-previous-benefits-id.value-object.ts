import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantPreviousBenefitsId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPreviousBenefitsId.name;
}
