import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitId.name;
}
