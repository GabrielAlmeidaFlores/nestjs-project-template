import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidEmailError extends InvalidInputError {
  protected override readonly _type = InvalidEmailError.name;

  public constructor() {
    super('O email informado não é válido');
  }
}
