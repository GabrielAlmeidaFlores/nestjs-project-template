import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRetirementPermanentDisabilityRevisionCompleteAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRetirementPermanentDisabilityRevisionCompleteAnalysisJsonError.name;

  public constructor() {
    super(
      'O resultado da análise completa retornado pela IA não é um JSON válido. Por favor, tente novamente.',
    );
  }
}
