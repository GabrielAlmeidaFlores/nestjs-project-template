import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class JudicialCaseAnalysisDocumentId extends Guid {
  protected override readonly _type = JudicialCaseAnalysisDocumentId.name;
}

