import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTemporaryIncapacityBenefitRejectionFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTemporaryIncapacityBenefitRejectionFirstAnalysisJsonError.name;

  public constructor() {
    super('O JSON da primeira análise é inválido.');
  }
}
