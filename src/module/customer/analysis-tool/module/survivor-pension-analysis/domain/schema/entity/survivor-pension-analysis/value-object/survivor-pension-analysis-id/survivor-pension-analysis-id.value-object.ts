import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SurvivorPensionAnalysisId extends Guid {
  protected override readonly _type = SurvivorPensionAnalysisId.name;
}
