import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTemporaryIncapacityBenefitTerminationResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTemporaryIncapacityBenefitTerminationResultJsonError.name;

  public constructor() {
    super('O JSON do resultado da análise é inválido.');
  }
}
