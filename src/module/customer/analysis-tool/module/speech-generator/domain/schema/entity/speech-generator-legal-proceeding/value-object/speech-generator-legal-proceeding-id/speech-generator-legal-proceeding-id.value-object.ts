import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpeechGeneratorLegalProceedingId extends Guid {
  protected override readonly _type =
    SpeechGeneratorLegalProceedingId.name;
}
