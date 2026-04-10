import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDpaNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDpaNotFoundError.name;

  public constructor() {
    super(
      'Análise de pensão do dependente do resultado da pensão por morte não encontrada',
    );
  }
}
