import { NotFoundError } from '@core/error/not-found.error';

export class InterviewFormNotFoundError extends NotFoundError {
  protected override readonly _type = InterviewFormNotFoundError.name;

  public constructor() {
    super('Ficha de entrevista não encontrada.');
  }
}
