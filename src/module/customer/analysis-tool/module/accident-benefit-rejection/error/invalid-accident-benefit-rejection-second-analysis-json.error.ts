import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAccidentBenefitRejectionSecondAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidAccidentBenefitRejectionSecondAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da segunda analise de indeferimento de beneficio acidentario e invalido.',
    );
  }
}
