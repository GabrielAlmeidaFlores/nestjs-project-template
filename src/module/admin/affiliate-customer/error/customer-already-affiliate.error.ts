import { InvalidInputError } from '@core/error/invalid-input.error';

export class CustomerAlreadyAffiliateError extends InvalidInputError {
  protected override readonly _type = CustomerAlreadyAffiliateError.name;

  public constructor() {
    super('Este customer já possui um cadastro de afiliado');
  }
}
