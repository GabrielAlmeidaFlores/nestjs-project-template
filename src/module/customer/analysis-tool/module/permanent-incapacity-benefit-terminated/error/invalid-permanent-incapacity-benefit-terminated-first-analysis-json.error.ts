import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidPermanentIncapacityBenefitTerminatedFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidPermanentIncapacityBenefitTerminatedFirstAnalysisJsonError.name;

  public constructor() {
    super('O JSON da primeira análise é inválido.');
  }
}
