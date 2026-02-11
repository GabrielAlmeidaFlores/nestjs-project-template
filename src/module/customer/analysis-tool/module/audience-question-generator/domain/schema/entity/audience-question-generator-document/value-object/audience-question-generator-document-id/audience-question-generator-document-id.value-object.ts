import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AudienceQuestionGeneratorDocumentId extends Guid {
  protected override readonly _type = AudienceQuestionGeneratorDocumentId.name;
}
