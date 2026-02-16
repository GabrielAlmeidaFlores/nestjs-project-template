import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPlanningRgpsAnalysisResultId extends Guid {
  protected override readonly _type =
    RetirementPlanningRgpsAnalysisResultId.name;
}
