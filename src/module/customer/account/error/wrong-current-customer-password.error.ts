import { InvalidInputError } from '@core/error/invalid-input.error';

export class WrongCurrentCustomerPasswordError extends InvalidInputError {
  protected override readonly _type = WrongCurrentCustomerPasswordError.name;

  public constructor() {
    super('A senha atual não está correta');
  }
}
