import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantEarningsHistoryId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementGrantEarningsHistoryId.name;
}
