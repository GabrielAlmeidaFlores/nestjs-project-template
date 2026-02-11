import { NotFoundError } from '@core/error/not-found.error';

export class SpeechGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type = SpeechGeneratorNotFoundError.name;

  public constructor() {
    super('Gerador de discurso não encontrado');
  }
}
