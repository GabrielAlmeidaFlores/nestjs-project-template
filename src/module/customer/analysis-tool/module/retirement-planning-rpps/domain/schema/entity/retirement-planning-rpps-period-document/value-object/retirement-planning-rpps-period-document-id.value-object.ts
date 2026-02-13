import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRppsPeriodDocumentId extends Guid {
  protected override readonly _type =
    RetirementPlanningRppsPeriodDocumentId.name;
}
