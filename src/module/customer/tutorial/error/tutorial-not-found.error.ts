import { NotFoundError } from '@core/error/not-found.error';

export class TutorialNotFoundError extends NotFoundError {
  protected override readonly _type = TutorialNotFoundError.name;

  public constructor() {
    super('Tutorial não encontrado.');
  }
}
