import { InvalidInputError } from '@core/error/invalid-input.error';

export class RuralTimelineAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    RuralTimelineAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise da linha do tempo rural não contém análise completa.');
  }
}
