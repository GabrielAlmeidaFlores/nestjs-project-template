import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AudienceQuestionGeneratorResultId extends Guid {
  protected override readonly _type = AudienceQuestionGeneratorResultId.name;
}
