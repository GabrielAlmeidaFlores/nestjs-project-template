import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidSpecialRetirementRejectionCompleteAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidSpecialRetirementRejectionCompleteAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON do resultado da análise de aposentadoria especial é inválido.',
    );
  }
}
