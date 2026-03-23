import { NotFoundError } from '@core/error/not-found.error';

export class BankTransferNotFoundError extends NotFoundError {
  protected override readonly _type = BankTransferNotFoundError.name;

  public constructor() {
    super('Transferência bancária não encontrada');
  }
}
