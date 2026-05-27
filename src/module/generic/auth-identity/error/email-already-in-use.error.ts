import { InvalidInputError } from '@core/error/invalid-input.error';

export class EmailAlreadyInUseError extends InvalidInputError {
  protected override readonly _type = EmailAlreadyInUseError.name;

  public constructor() {
    super('The email address is already in use.');
  }
}
