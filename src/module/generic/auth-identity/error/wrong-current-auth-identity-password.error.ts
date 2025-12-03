import { InvalidInputError } from '@core/error/invalid-input.error';

export class WrongCurrentAuthIdentityPasswordError extends InvalidInputError {
  protected override readonly _type =
    WrongCurrentAuthIdentityPasswordError.name;

  public constructor() {
    super('A senha atual não está correta');
  }
}
