import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidDecimalValueError extends InvalidInputError {
  protected override readonly _type = InvalidDecimalValueError.name;

  public constructor() {
    super('O valor decimal informado não é válido');
  }
}
