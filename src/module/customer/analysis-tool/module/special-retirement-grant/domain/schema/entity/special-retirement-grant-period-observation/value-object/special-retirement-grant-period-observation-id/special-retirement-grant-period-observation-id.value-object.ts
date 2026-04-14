import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantPeriodObservationId extends Guid {
  protected override readonly _type =
    SpecialRetirementGrantPeriodObservationId.name;
}
