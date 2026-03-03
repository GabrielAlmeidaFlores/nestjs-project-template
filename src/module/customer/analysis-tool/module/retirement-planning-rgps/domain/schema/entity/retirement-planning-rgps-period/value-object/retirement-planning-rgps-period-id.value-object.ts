import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsPeriodId extends Guid {
  protected override readonly _type = RetirementPlanningRgpsPeriodId.name;
}
