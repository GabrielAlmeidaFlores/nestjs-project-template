import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementRejectionWorkPeriodId extends Guid {
  protected override readonly _type =
    SpecialRetirementRejectionWorkPeriodId.name;
}
