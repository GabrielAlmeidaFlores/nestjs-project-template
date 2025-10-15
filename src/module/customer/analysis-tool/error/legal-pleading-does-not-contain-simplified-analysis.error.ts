import { InvalidInputError } from '@core/error/invalid-input.error';

export class LegalPleadingDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    LegalPleadingDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('A peça processual não contém análise simples.');
  }
}
