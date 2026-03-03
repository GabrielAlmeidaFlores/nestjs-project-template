import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsSpecialPeriodId extends Guid {
  protected override readonly _type =
    RetirementPlanningRgpsSpecialPeriodId.name;
}
