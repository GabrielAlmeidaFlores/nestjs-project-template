import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisResultDependentPensionAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise de pensão do dependente do resultado da pensão por morte não encontrada',
    );
  }
}
