import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpeechGeneratorResultId extends Guid {
  protected override readonly _type = SpeechGeneratorResultId.name;
}
