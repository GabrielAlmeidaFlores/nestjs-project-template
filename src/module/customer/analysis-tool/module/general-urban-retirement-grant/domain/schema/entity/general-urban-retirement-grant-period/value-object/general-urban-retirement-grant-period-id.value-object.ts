import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantPeriodId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementGrantPeriodId.name;
}
