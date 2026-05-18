import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementRejectionDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementRejectionDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise de indeferimento de aposentadoria especial não contém análise completa disponível para download.',
    );
  }
}
