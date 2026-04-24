import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcDisabilityDenialDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcDisabilityDenialDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de indeferimento de BPC Pessoa com Deficiência não contém análise simplificada.',
    );
  }
}
