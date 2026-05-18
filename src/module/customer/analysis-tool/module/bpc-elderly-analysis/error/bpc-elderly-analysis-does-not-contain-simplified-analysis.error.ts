import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('A análise de BPC ao Idoso não contém análise simplificada.');
  }
}
