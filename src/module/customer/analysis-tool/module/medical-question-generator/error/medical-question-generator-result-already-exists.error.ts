import { ConflictError } from '@core/error/conflict.error';

export class MedicalQuestionGeneratorResultAlreadyExistsError extends ConflictError {
  protected override readonly _type =
    MedicalQuestionGeneratorResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado do gerador de perguntas médicas já existe.');
  }
}
