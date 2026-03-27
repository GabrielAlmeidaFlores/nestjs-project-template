import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningId extends Guid {
  protected override readonly _type = DisabilityRetirementPlanningId.name;
}
