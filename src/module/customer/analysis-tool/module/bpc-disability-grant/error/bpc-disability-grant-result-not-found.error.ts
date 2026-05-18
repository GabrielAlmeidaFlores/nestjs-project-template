import { NotFoundError } from '@core/error/not-found.error';

export class BpcDisabilityGrantResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcDisabilityGrantResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da anÃ¡lise de indeferimento de BPC Pessoa com DeficiÃªncia nÃ£o encontrado.',
    );
  }
}
