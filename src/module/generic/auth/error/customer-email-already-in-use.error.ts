import { InvalidInputError } from '@core/error/invalid-input.error';

export class CustomerEmailAlreadyInUseError extends InvalidInputError {
  protected override readonly _type = CustomerEmailAlreadyInUseError.name;

  public constructor() {
    super('O email informado já está sendo utilizado');
  }
}
