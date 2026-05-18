import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningGrantDocumentId extends Guid {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantDocumentId.name;
}
