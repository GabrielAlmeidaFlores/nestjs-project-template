import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidSpecialRetirementGrantCompleteAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidSpecialRetirementGrantCompleteAnalysisJsonError.name;

  public constructor() {
    super(
      'JSON de análise completa inválido para concessão de aposentadoria especial',
    );
  }
}
