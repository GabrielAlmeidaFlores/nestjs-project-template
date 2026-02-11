import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpeechGeneratorBenefitId extends Guid {
  protected override readonly _type = SpeechGeneratorBenefitId.name;
}
