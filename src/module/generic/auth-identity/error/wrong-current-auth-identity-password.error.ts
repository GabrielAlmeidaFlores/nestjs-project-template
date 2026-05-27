import { InvalidInputError } from '@core/error/invalid-input.error';

export class WrongCurrentAuthIdentityPasswordError extends InvalidInputError {
  protected override readonly _type =
    WrongCurrentAuthIdentityPasswordError.name;

  public constructor() {
    super('The current password is incorrect.');
  }
}
