import { InvalidInputError } from '@core/error/invalid-input.error';

export class PerCapitaIncomeForBpcAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de renda per capita para BPC não contém uma análise simplificada.',
    );
  }
}
