import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningRejectionDocumentId extends Guid {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionDocumentId.name;
}
