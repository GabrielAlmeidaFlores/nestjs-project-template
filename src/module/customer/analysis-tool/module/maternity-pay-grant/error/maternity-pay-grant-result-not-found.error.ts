import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantResultNotFoundError extends NotFoundError {
  protected override readonly _type = MaternityPayGrantResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de salário-maternidade não encontrado. Por favor, gere a análise completa antes de realizar esta ação.',
    );
  }
}
