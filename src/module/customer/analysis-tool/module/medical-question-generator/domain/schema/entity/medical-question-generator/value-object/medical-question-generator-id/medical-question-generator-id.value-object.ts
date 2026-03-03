import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalQuestionGeneratorId extends Guid {
  protected override readonly _type = MedicalQuestionGeneratorId.name;
}
