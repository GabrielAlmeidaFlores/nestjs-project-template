import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTemporaryDisabilityBenefitsTerminatedFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTemporaryDisabilityBenefitsTerminatedFirstAnalysisJsonError.name;

  public constructor() {
    super('O JSON da primeira análise é inválido.');
  }
}
