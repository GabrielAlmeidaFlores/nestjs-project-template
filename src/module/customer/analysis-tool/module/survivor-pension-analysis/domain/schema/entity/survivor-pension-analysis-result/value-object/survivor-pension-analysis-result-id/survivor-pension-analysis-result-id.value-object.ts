import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisResultId extends Guid {
  protected override readonly _type = SurvivorPensionAnalysisResultId.name;
}
