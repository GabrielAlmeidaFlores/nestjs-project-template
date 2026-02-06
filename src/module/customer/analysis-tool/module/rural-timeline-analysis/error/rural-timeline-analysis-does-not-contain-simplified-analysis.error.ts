import { InvalidInputError } from '@core/error/invalid-input.error';

export class RuralTimelineAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    RuralTimelineAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('A análise da linha do tempo rural não contém análise simplificada.');
  }
}
