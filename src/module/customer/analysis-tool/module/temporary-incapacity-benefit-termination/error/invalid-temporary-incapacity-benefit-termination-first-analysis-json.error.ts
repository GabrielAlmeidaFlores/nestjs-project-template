import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTemporaryIncapacityBenefitTerminationFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTemporaryIncapacityBenefitTerminationFirstAnalysisJsonError.name;

  public constructor() {
    super('O JSON da primeira análise é inválido.');
  }
}
