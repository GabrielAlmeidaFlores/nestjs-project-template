import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantPeriodId extends Guid {
  protected override readonly _type = SpecialRetirementGrantPeriodId.name;
}
