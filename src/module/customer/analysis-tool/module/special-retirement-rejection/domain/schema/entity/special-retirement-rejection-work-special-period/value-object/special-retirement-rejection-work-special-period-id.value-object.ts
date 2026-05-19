import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementRejectionWorkSpecialPeriodId extends Guid {
  protected override readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodId.name;
}
