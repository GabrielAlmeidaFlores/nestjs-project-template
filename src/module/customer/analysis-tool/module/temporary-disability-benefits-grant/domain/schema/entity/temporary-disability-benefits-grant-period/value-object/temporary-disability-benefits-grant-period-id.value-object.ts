import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsGrantPeriodId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodId.name;
}
