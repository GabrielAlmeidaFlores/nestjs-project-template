import { ConflictError } from '@core/error/conflict.error';

export class CustomerAlreadyAffiliateError extends ConflictError {
  protected override readonly _type = CustomerAlreadyAffiliateError.name;

  public constructor() {
    super('Este customer já possui um cadastro de afiliado');
  }
}
