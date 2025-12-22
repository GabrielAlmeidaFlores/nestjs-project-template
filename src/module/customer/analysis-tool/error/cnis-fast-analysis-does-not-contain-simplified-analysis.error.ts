import { InvalidInputError } from '@core/error/invalid-input.error';

export class CnisFastAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    CnisFastAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('A análise rápida não contém uma análise simples.');
  }
}
