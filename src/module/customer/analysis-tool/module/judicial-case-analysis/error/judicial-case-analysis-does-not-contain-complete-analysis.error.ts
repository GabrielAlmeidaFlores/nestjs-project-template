import { InvalidInputError } from '@core/error/invalid-input.error';

export class JudicialCaseAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    JudicialCaseAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise de caso judicial não contém uma análise completa.');
  }
}
