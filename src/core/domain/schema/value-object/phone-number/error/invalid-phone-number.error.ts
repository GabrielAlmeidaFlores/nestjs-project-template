import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPhoneNumberError extends InvalidInputError {
  protected override readonly _type = InvalidPhoneNumberError.name;

  public constructor() {
    super('O número de celular informado não é válido');
  }
}
