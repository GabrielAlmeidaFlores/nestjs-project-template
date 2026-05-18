import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementRejectionDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementRejectionDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de indeferimento de aposentadoria especial não contém análise simplificada disponível para download.',
    );
  }
}
