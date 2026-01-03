import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsId extends Guid {
  protected override readonly _type = RetirementPlanningRgpsId.name;
}
