import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidMaternityPayGrantFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidMaternityPayGrantFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise prévia de salário-maternidade retornado pela IA é inválido. Por favor, tente novamente.',
    );
  }
}
