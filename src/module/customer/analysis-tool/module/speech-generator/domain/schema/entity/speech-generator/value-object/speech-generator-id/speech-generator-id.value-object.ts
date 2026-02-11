import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpeechGeneratorId extends Guid {
  protected override readonly _type = SpeechGeneratorId.name;
}
