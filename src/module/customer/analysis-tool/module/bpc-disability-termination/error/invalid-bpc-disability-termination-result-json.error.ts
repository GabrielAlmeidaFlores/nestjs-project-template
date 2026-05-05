import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBpcDisabilityTerminationResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidBpcDisabilityTerminationResultJsonError.name;

  public constructor() {
    super(
      'O resultado retornado para a análise de BPC Pessoa com Deficiência cessado está em formato inválido.',
    );
  }
}
