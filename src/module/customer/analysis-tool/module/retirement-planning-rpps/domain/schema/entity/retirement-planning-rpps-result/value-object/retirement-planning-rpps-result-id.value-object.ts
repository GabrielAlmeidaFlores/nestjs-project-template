import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRppsResultId extends Guid {
  protected override readonly _type = RetirementPlanningRppsResultId.name;
}
