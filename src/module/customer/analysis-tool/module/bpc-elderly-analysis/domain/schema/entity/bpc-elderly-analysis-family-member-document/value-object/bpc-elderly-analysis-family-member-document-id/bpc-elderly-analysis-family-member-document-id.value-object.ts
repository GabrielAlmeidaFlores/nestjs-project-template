import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcElderlyAnalysisFamilyMemberDocumentId extends Guid {
  protected override readonly _type =
    BpcElderlyAnalysisFamilyMemberDocumentId.name;
}
