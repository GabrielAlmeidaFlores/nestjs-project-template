import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTemporaryDisabilityBenefitsGrantResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTemporaryDisabilityBenefitsGrantResultJsonError.name;

  public constructor() {
    super(
      'O JSON do resultado da análise de concessão de benefício por incapacidade temporária é inválido.',
    );
  }
}
