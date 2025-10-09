import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalPleadingDocumentAnalysisId extends Guid {
  protected override readonly _type = LegalPleadingDocumentAnalysisId.name;
}
