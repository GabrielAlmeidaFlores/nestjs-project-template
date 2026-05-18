import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyAnalysisDocumentId extends Guid {
  protected override readonly _type = BpcElderlyAnalysisDocumentId.name;
}
