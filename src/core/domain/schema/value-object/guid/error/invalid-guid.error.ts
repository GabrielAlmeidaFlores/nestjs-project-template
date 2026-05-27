import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidGuidError extends InvalidInputError {
  protected override readonly _type = InvalidGuidError.name;

  public constructor() {
    super('The provided ID is not valid.');
  }
}
