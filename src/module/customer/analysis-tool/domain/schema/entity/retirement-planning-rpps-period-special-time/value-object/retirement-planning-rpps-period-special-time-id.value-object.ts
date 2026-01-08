import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRppsPeriodSpecialTimeId extends Guid {
  protected override readonly _type =
    RetirementPlanningRppsPeriodSpecialTimeId.name;
}
