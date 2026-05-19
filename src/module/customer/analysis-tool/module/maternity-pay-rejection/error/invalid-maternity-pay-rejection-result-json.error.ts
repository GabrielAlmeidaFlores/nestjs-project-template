import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidMaternityPayRejectionResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidMaternityPayRejectionResultJsonError.name;

  public constructor() {
    super(
      'O resultado da análise de indeferimento de salário maternidade possui formato inválido.',
    );
  }
}
