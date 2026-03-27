import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementAnalysisResultId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementAnalysisResultId.name;
}
