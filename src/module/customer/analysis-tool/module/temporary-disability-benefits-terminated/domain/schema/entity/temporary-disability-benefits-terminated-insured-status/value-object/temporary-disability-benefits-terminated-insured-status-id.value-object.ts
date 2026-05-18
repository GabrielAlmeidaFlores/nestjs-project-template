import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsTerminatedInsuredStatusId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedInsuredStatusId.name;
}
