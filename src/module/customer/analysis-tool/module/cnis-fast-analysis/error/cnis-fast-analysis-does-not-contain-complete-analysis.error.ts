import { InvalidInputError } from '@core/error/invalid-input.error';

export class CnisFastAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    CnisFastAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise rápida não contém uma análise completa.');
  }
}
