import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementAnalysisRemunerationId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementAnalysisRemunerationId.name;
}
