import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalQuestionGeneratorDocumentId extends Guid {
  protected override readonly _type = MedicalQuestionGeneratorDocumentId.name;
}
