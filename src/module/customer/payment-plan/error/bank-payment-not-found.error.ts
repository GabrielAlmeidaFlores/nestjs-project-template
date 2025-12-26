import { NotFoundError } from '@core/error/not-found.error';

export class BankPaymentNotFoundError extends NotFoundError {
  protected override readonly _type = BankPaymentNotFoundError.name;

  public constructor() {
    super('Pagamento bancário não encontrado');
  }
}
