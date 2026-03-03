import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRppsPeriodId extends Guid {
  protected override readonly _type = RetirementPlanningRppsPeriodId.name;
}
