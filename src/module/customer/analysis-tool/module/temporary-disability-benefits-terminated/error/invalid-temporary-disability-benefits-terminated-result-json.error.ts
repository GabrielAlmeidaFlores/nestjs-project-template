import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidTemporaryDisabilityBenefitsTerminatedResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidTemporaryDisabilityBenefitsTerminatedResultJsonError.name;

  public constructor() {
    super('O JSON do resultado da análise é inválido.');
  }
}
