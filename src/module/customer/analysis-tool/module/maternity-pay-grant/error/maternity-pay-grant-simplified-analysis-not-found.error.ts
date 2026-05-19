import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayGrantSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada do salário-maternidade não encontrada. Por favor, tente novamente.',
    );
  }
}
