import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class MedicalQuestionGeneratorInssBenefitId extends Guid {
  protected override readonly _type =
    MedicalQuestionGeneratorInssBenefitId.name;
}
