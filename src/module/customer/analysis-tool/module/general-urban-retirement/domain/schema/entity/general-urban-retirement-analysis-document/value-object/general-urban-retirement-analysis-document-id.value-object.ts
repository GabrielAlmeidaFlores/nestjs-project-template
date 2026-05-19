import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementAnalysisDocumentId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementAnalysisDocumentId.name;
}
