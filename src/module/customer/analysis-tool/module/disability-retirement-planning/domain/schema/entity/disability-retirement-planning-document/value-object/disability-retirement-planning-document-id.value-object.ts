import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningDocumentId extends Guid {
  protected override readonly _type =
    DisabilityRetirementPlanningDocumentId.name;
}
