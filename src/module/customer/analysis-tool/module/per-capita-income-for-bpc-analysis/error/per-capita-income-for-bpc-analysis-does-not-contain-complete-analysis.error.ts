import { InvalidInputError } from '@core/error/invalid-input.error';

export class PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise de renda per capita para BPC não contém uma análise completa.',
    );
  }
}
