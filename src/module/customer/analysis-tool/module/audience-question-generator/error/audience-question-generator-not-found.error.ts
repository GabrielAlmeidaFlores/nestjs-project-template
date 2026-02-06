import { NotFoundError } from '@core/error/not-found.error';

export class AudienceQuestionGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type = AudienceQuestionGeneratorNotFoundError.name;

  public constructor() {
    super('Gerador de perguntas para audiência não encontrado');
  }
}
