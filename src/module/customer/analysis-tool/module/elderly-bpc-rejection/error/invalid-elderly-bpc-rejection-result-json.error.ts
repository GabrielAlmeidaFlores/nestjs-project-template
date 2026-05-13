import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidElderlyBpcRejectionResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidElderlyBpcRejectionResultJsonError.name;

  public constructor() {
    super(
      'O resultado da análise de Indeferimento de BPC Idoso retornado pela IA é inválido. Por favor, tente novamente.',
    );
  }
}
