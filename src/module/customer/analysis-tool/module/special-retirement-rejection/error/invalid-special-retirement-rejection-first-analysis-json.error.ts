import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidSpecialRetirementRejectionFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidSpecialRetirementRejectionFirstAnalysisJsonError.name;

  public constructor() {
    super('O JSON da primeira análise de aposentadoria especial é inválido.');
  }
}
