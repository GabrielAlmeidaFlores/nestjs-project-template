import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada de indeferimento de salário maternidade não encontrada.',
    );
  }
}
