import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsLegalProceedingId extends Guid {
  protected override readonly _type =
    RetirementPlanningRgpsLegalProceedingId.name;
}
