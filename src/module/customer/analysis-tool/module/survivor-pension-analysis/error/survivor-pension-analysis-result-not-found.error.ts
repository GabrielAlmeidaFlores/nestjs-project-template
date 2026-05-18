import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise de pensão por morte não encontrado');
  }
}
