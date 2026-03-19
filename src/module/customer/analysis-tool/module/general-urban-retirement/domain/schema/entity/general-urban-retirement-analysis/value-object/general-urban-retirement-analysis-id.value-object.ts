import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementAnalysisId extends Guid {
  protected override readonly _type = GeneralUrbanRetirementAnalysisId.name;
}
