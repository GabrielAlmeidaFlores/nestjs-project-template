import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTemporaryIncapacityBenefitRejectionResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTemporaryIncapacityBenefitRejectionResultJsonError.name;

  public constructor() {
    super('O JSON do resultado da análise é inválido.');
  }
}
