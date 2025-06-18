import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCustomerAdressCityError extends InvalidInputError {
  protected override readonly _type = InvalidCustomerAdressCityError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome deve conter de ${props.minLength} a ${props.maxLength} caracteres.`,
    );
  }
}
