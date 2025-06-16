import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidUrlError extends InvalidInputError {
  protected override readonly _type = InvalidUrlError.name;

  public constructor() {
    super('A URL informada não é válida');
  }
}
