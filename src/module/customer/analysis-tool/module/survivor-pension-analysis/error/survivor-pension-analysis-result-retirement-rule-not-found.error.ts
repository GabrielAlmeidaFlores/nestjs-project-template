import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisResultRetirementRuleNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleNotFoundError.name;

  public constructor() {
    super(
      'Regra de aposentadoria do resultado da pensão por morte não encontrada',
    );
  }
}
