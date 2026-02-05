import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalQuestionGeneratorResultId extends Guid {
  protected override readonly _type = MedicalQuestionGeneratorResultId.name;
}
