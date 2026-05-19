import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBpcDisabilityDenialResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidBpcDisabilityDenialResultJsonError.name;

  public constructor() {
    super(
      'O resultado retornado para a análise de indeferimento de BPC Pessoa com Deficiência está em formato inválido.',
    );
  }
}
