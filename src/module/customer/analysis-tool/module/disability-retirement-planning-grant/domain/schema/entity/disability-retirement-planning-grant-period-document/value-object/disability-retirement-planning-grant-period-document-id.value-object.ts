import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityRetirementPlanningGrantPeriodDocumentId extends Guid {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodDocumentId.name;
}
