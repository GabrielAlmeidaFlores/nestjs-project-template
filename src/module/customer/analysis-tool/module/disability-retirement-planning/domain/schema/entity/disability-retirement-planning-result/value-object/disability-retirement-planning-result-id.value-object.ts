import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningResultId extends Guid {
  protected override readonly _type = DisabilityRetirementPlanningResultId.name;
}
