import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAccidentBenefitRejectionFirstAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidAccidentBenefitRejectionFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da primeira análise de indeferimento de benefício acidentário é inválido.',
    );
  }
}
