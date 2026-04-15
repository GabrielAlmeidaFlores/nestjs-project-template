import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementGrantDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementGrantDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A concessão de aposentadoria especial não contém análise completa disponível para download.',
    );
  }
}
