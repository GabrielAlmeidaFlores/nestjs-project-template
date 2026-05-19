import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidPermanentIncapacityBenefitTerminatedResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidPermanentIncapacityBenefitTerminatedResultJsonError.name;

  public constructor() {
    super('O JSON do resultado da análise é inválido.');
  }
}
