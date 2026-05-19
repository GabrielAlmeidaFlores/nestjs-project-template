import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningGrantResultId extends Guid {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantResultId.name;
}
