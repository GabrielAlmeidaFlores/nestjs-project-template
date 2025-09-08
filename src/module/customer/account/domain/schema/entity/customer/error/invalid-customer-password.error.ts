import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCustomerPasswordError extends InvalidInputError {
  protected override readonly _type = InvalidCustomerPasswordError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `A senha deve conter de ${props.minLength} a ${props.maxLength} caracteres`,
    );
  }
}
