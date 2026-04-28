import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityTerminationDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityTerminationDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise de BPC Pessoa com Deficiência cessado não contém análise completa.',
    );
  }
}
