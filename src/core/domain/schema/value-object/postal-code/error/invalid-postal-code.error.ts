import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPostalCodeError extends InvalidInputError {
  protected override readonly _type = InvalidPostalCodeError.name;

  public constructor() {
    super('O CEP informado não é válido');
  }
}
