import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpeechGeneratorDocumentId extends Guid {
  protected override readonly _type = SpeechGeneratorDocumentId.name;
}
