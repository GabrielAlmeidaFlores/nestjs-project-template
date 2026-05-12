import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityGrantNotFoundError extends NotFoundError {
  protected override readonly _type = BpcDisabilityGrantNotFoundError.name;

  public constructor() {
    super(
      'AnÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia nÃ£o encontrada.',
    );
  }
}
