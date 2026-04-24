import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAccidentBenefitRejectionResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidAccidentBenefitRejectionResultJsonError.name;

  public constructor() {
    super(
      'O JSON do resultado da análise de indeferimento de benefício acidentário é inválido.',
    );
  }
}
