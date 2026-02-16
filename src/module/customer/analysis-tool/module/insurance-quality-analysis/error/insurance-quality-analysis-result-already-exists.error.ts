import { InvalidInputError } from '@core/error/invalid-input.error';

export class InsuranceQualityAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    InsuranceQualityAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da análise de qualidade de segurado já existe.');
  }
}
