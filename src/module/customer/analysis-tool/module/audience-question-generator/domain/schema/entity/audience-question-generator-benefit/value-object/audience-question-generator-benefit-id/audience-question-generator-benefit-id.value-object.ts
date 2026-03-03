import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AudienceQuestionGeneratorBenefitId extends Guid {
  protected override readonly _type = AudienceQuestionGeneratorBenefitId.name;
}
