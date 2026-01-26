import { NotFoundError } from '@core/error/not-found.error';

export class MedicalQuestionGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    MedicalQuestionGeneratorNotFoundError.name;

  public constructor() {
    super('Gerador de perguntas médicas não encontrado.');
  }
}
