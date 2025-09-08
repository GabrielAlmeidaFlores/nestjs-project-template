import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidGuidError extends InvalidInputError {
  protected override readonly _type = InvalidGuidError.name;

  public constructor() {
    super('O ID informado não é válido');
  }
}
