import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityTerminationDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityTerminationDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de BPC Pessoa com Deficiência cessado não contém análise simplificada.',
    );
  }
}
