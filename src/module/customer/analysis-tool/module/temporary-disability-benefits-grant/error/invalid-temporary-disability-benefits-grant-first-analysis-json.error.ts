import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidTemporaryDisabilityBenefitsGrantFirstAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidTemporaryDisabilityBenefitsGrantFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da primeira análise de concessão de benefício por incapacidade temporária é inválido.',
    );
  }
}
