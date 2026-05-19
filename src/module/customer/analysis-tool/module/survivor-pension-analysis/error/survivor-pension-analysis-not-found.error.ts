import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = SurvivorPensionAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de pensão por morte não encontrada');
  }
}
