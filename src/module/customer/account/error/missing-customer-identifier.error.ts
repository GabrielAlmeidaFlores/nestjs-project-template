import { InvalidInputError } from '@core/error/invalid-input.error';

export class MissingCustomerIdentifierError extends InvalidInputError {
  protected override readonly _type = MissingCustomerIdentifierError.name;

  public constructor() {
    super('É necessário informar o e-mail ou o documento federal');
  }
}
