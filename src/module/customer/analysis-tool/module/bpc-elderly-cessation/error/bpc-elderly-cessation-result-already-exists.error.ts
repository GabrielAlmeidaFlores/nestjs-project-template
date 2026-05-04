import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyCessationResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyCessationResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da análise de cessação de BPC ao Idoso já existe.');
  }
}
