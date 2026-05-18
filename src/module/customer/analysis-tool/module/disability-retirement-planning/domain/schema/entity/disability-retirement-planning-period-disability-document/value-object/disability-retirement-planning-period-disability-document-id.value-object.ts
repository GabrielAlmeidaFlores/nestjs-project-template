import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningPeriodDisabilityDocumentId extends Guid {
  protected override readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentId.name;
}
