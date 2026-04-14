import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDoesNotContainCompleteAnalysisError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise completa da pensão por morte não foi gerada. Gere a análise antes de fazer o download.',
    );
  }
}
