import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantAnalysisResultId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultId.name;
}
