import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyCessationResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcElderlyCessationResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise de cessação de BPC ao Idoso não encontrado.');
  }
}
