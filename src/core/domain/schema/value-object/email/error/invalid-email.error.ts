import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidEmailError extends InvalidInputError {
  protected override readonly _type = InvalidEmailError.name;

  public constructor() {
    super('The provided email address is not valid.');
  }
}
