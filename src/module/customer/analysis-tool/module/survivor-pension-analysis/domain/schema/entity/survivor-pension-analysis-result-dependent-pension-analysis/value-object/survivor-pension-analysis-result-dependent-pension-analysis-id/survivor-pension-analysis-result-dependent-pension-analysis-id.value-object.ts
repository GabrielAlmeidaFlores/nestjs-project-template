import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisResultDependentPensionAnalysisId extends Guid {
  protected override readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisId.name;
}
