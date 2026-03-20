import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantSpecialPeriodId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodId.name;
}
