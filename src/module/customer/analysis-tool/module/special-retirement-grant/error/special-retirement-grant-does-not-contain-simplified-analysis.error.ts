import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementGrantDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementGrantDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A concessão de aposentadoria especial não contém análise simplificada disponível para download.',
    );
  }
}
