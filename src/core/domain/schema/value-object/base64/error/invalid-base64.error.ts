import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBase64Error extends InvalidInputError {
  protected override readonly _type = InvalidBase64Error.name;

  public constructor() {
    super('The provided Base64 value is not valid.');
  }
}
