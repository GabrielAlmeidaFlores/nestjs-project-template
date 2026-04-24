import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityDenialDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityDenialDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise de indeferimento de BPC Pessoa com Deficiência não contém análise completa.',
    );
  }
}
