import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise de BPC ao Idoso não contém análise completa.');
  }
}
