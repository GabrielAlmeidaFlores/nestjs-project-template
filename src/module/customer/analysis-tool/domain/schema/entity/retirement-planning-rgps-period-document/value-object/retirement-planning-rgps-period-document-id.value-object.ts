import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsPeriodDocumentId extends Guid {
  protected override readonly _type =
    RetirementPlanningRgpsPeriodDocumentId.name;
}
