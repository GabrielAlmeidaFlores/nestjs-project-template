import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyCessationNotFoundError extends NotFoundError {
  protected override readonly _type = BpcElderlyCessationNotFoundError.name;

  public constructor() {
    super('Análise de cessação de BPC ao Idoso não encontrada.');
  }
}
