import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCustomerPasswordError extends InvalidInputError {
  protected override readonly _type = InvalidCustomerPasswordError.name;
}
