import { UnexpectedError } from '@core/error/unexpected.error';

export class PaidResourceUnavailableError extends UnexpectedError {
  protected override readonly _type = PaidResourceUnavailableError.name;

  public constructor() {
    super('O recurso pago não está disponível.');
  }
}
