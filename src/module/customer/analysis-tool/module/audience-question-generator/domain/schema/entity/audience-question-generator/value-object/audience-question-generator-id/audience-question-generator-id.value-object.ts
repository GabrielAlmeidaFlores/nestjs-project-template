import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AudienceQuestionGeneratorId extends Guid {
  protected override readonly _type = AudienceQuestionGeneratorId.name;
}
