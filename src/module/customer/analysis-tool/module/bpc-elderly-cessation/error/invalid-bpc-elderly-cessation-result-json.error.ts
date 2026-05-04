import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBpcElderlyCessationResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidBpcElderlyCessationResultJsonError.name;

  public constructor() {
    super(
      'O resultado retornado para a análise de cessação de BPC ao Idoso está em formato inválido.',
    );
  }
}
