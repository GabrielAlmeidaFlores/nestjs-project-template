import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantEarningsHistoryId extends Guid {
  protected override readonly _type =
    SpecialRetirementGrantEarningsHistoryId.name;
}
