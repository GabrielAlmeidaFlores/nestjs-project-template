import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidMaternityPayGrantResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidMaternityPayGrantResultJsonError.name;

  public constructor() {
    super(
      'O JSON da análise completa de salário-maternidade retornado pela IA é inválido. Por favor, tente novamente.',
    );
  }
}
