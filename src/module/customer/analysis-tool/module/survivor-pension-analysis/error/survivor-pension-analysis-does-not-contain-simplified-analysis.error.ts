import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDoesNotContainSimplifiedAnalysisError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise simplificada da pensão por morte não pôde ser gerada. Verifique se a análise completa foi gerada primeiro.',
    );
  }
}
