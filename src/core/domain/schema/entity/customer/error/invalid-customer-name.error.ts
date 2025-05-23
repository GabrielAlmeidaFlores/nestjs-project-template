import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCustomerNameError extends InvalidInputError {
  protected override readonly _type = InvalidCustomerNameError.name;
}
