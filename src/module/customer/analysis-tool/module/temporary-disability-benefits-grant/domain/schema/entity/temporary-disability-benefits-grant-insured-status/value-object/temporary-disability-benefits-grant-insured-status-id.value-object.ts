import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantInsuredStatusId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInsuredStatusId.name;
}
