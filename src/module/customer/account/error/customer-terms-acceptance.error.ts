import { ConflictError } from '@core/error/conflict.error';

export class CustomerTermsAcceptanceError extends ConflictError {
  protected override readonly _type = CustomerTermsAcceptanceError.name;

  public constructor() {
    super('Os termos já foram aceitos por este cliente');
  }
}
