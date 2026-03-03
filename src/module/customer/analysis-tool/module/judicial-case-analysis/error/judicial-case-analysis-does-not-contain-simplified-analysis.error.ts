import { InvalidInputError } from '@core/error/invalid-input.error';

export class JudicialCaseAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    JudicialCaseAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('A análise de caso judicial não contém uma análise simplificada.');
  }
}
