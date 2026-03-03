import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsResultId extends Guid {
  protected override readonly _type = RetirementPlanningRgpsResultId.name;
}
