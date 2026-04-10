import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisRrNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisRrNotFoundError.name;

  public constructor() {
    super(
      'Regra de aposentadoria do resultado da pensão por morte não encontrada',
    );
  }
}
