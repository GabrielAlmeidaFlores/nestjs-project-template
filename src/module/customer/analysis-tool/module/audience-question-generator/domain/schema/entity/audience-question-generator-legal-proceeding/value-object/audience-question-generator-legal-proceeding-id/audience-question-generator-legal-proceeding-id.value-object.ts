import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AudienceQuestionGeneratorLegalProceedingId extends Guid {
  protected override readonly _type =
    AudienceQuestionGeneratorLegalProceedingId.name;
}
