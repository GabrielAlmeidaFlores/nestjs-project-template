import { InvalidInputError } from '@core/error/invalid-input.error';

export class LegalPleadingDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    LegalPleadingDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A peça processual não contém análise completa.');
  }
}
