import { NotFoundError } from '@core/error/not-found.error';

export class CustomerNotFoundError extends NotFoundError {
  protected override readonly _type = CustomerNotFoundError.name;

  public constructor() {
    super('Cliente não encontrado');
  }
}
